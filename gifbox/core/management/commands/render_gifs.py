import subprocess
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
            'output_filename': '/tmp/3hourly.gif',
        },
        {
            'period': AnimatedGif.PERIOD_DAILY,
            'created__gte': timezone.now() - timedelta(days=1),
            'output_filename': '/tmp/daily.gif',
        },
    )

    def make_gif(self, snapshot_filenames, output_filename, delay_ms=30, resize_px=800):
        result = subprocess.run(
            ['convert', '-delay', delay_ms] +
            snapshot_filenames +
            ['-loop', '0', '-resize', resize_px, output_filename])
        if result.returncode:
            raise CommandError(
                'Received error code {} when running {}'.format(result.returncode, result.args))

    def handle(self, *args, **options):
        for gif_profile in self.GIF_PROFILES:
            output_filename = gif_profile.pop('output_filename')

            if not AnimatedGif.objects.filter(**gif_profile).exists():
                # No gif for the defired time period. Generate a new one based on any new snapshots
                # uploaded in that time
                snapshot_filenames = [
                    snapshot.image.file.name
                    for snapshot in (
                        Image.objects
                            .filter(created__gte=gif_profile['created__gte'])
                            .order_by('created')
                        )
                    ]
                self.make_gif(snapshot_filenames, output_filename)
