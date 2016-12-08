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

    def handle(self, *args, **options):
        three_hours_ago = timezone.now() - timedelta(hours=3)
        
        if not AnimatedGif.objects.filter(period='hourly', created__gte=three_hours_ago).exists():
            # No gif from the last hour. Generate a new one based on any new snapshot uploaded
            snapshot_filenames = [
                snapshot.image.file.name
                for snapshot in Image.objects.filter(created__gte=three_hours_ago).order_by('created')
                ]
            result = subprocess.run(
                ['convert', '-delay', '30'] +
                snapshot_filenames +
                ['-loop', '0', '-resize', '800', '/tmp/3hourly.gif'])
            if result.returncode:
                raise CommandError(
                    'Received error code {} when running {}'.format(result.returncode, result.args))

