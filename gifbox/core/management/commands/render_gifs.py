import os
import subprocess
import requests
import shutil
import tempfile

from datetime import timedelta

from django.utils import timezone
from django.core.management.base import BaseCommand, CommandError

from core.models import Image, AnimatedGif


class Command(BaseCommand):
    help = """
        Generates animated gifs

        If it has been 3 hours since the last 3 hourly gif was made it generates a new one
        If it has been a day since the last daily gif it will generate another one
    """

    GIF_PROFILES = (
        {
            'period': AnimatedGif.PERIOD_3_HOURLY,
            'created__gte': timezone.now() - timedelta(hours=3),
            'output_file_path': '/tmp/{}.gif'.format(AnimatedGif.PERIOD_3_HOURLY),
        },
        # {
        #     'period': AnimatedGif.PERIOD_DAILY,
        #     'created__gte': timezone.now() - timedelta(days=1),
        #     'output_file_path': '/tmp/{}.gif'.format(AnimatedGif.PERIOD_DAILY),
        # },
    )

    GIF_VERSIONS = (
        {
            'name': 'full size',
            'thumb_size': None,
        },
        {
            'name': 'preview',
            'thumb_size': '200x200',
        },
    )

    def make_gif(self, snapshot_image_urls, output_file_path, delay_ms='30'):
        if not snapshot_image_urls:
            return

        scratch_dir = tempfile.mkdtemp()
        self.stdout.write('Using scratch dir {}'.format(scratch_dir))

        snapshot_file_paths = []

        for url in snapshot_image_urls:
            # Download and save all the images to the scratch_dir so that convert can process
            # them
            self.stdout.write('Downloading {}'.format(url))

            response = requests.get(url, stream=True)
            if response.ok:
                file_path = os.path.join(scratch_dir, os.path.basename(url))
                with open(file_path, 'wb') as out_file:
                    self.stdout.write('Saving to {}'.format(file_path))
                    shutil.copyfileobj(response.raw, out_file)
                snapshot_file_paths.append(file_path)
            else:
                self.stderr.write('Error {} when getting {}'.format(response.status_code, url))

        # Construct the convert command
        command = ['convert']

        if delay_ms is not None:
            command += ['-delay', delay_ms]

        if resize_px is not None:
            command += ['-resize', resize_px]

        command += ['-loop', '0'] + snapshot_file_paths + [output_file_path]

        # Generate the gif
        result = subprocess.run(command)

        # Delete the scratch dir
        shutil.rmtree(scratch_dir)

        if result.returncode:
            raise CommandError(
                'Received error code {} when running {}'.format(result.returncode, result.args))

    def handle(self, *args, **options):
        for gif_profile in self.GIF_PROFILES:
            output_file_path = gif_profile.pop('output_file_path')

            if not AnimatedGif.objects.filter(**gif_profile).exists():
                # No gif for the defired time period. Generate a new one based on any new snapshots
                # uploaded in that time
                snapshots_to_render = (
                    Image.objects
                        .filter(created__gte=gif_profile['created__gte'])
                        .order_by('created'))

                snapshot_image_fields = [snapshot.image for snapshot in snapshots_to_render]

                # Create the new AnimatedGif instance but don't save it yet
                gif_instance = AnimatedGif(
                    title=os.path.basename(output_file_path), period=gif_profile['period'])

                # Render the gif versions (ie full size and thumbnail)
                for version in self.GIF_VERSIONS:
                    if version['thumb_size'] is None:
                        snapshot_urls = [field.url for field in snapshot_image_fields]
                        gif_path = output_file_path
                        self.make_gif(snapshot_urls, gif_path)
                        image_field = gif_instance.image
                    else:
                        snapshot_urls = [
                            field.thumbnail[version['thumb_size']].url
                            for field in snapshot_image_fields]
                        path_bits = output_file_path.rsplit('.', maxsplit=1)
                        path_bits[0] = '{}_{}'.format(path_bits[0], version['thumb_size'])
                        gif_path = '.'.join(path_bits)
                        self.make_gif(snapshot_urls, gif_path, resize_px=None)
                        image_field = getattr(gif_instance, 'image_{}'.format(version['name']))

                    # Read the gif data into a buffer and save it on the appropriate image field
                    with open(gif_path, 'rb') as image_data:
                        file_name = os.path.basename(gif_path)
                        image_field.save(file_name, image_data)

                gif_instance.save()

                # Now go ahead and delete the snapshots to conserve space
                # They need to be individually deleted so the corresponding image file in S3
                # storage is deleted as well
                for snapshot in snapshots_to_render:
                    snapshot.delete()

        self.stdout.write(self.style.SUCCESS('Process complete'))
