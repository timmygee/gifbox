import os
from datetime import datetime

from django.db import models

from versatileimagefield.fields import VersatileImageField


def snapshot_path(instance, filename):
    now = datetime.now()
    return 'snapshots/{}/{}'.format(now.strftime('%Y-%m-%d'), filename)


def animated_gif_path(instance, filename):
    now = datetime.now()
    return 'gifs/{}/{}'.format(now.strftime('%Y-%m-%d'), filename)


class BaseImage(models.Model):
    class Meta:
        abstract = True
        get_latest_by = 'created'

    title = models.CharField(max_length=255, blank=True)
    # TODO: Maybe set this up to be S3 storage rather than file system
    image = VersatileImageField(
        upload_to=snapshot_path, width_field='image_width', height_field='image_height')
    image_height = models.PositiveSmallIntegerField()
    image_width = models.PositiveSmallIntegerField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return os.path.basename(self.image.file.name)


class Image(BaseImage):
    pass


class AnimatedGif(BaseImage):
    PERIOD_DAILY = 'daily'
    PERIOD_3_HOURLY = '3hourly'

    PERIOD_CHOICES = (
        (PERIOD_3_HOURLY, PERIOD_3_HOURLY),
        (PERIOD_DAILY, PERIOD_DAILY),
    )

    image = VersatileImageField(
        upload_to=animated_gif_path, width_field='image_width', height_field='image_height')
    period = models.CharField(max_length=10, choices=PERIOD_CHOICES)
