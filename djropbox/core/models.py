from django.db import models
from datetime import datetime


def snapshot_path(instance, filename):
    now = datetime.now()
    return 'snapshots/{}/{}/{}'.format(now.strftime('%Y-%m-%d'), now.strftime('%H'), filename)


class Image(models.Model):
    title = models.CharField(max_length=255, blank=True)
    image = models.ImageField(
        upload_to=snapshot_path, width_field='image_width', height_field='image_height')
    image_height = models.PositiveSmallIntegerField()
    image_width = models.PositiveSmallIntegerField()
    created = models.DateTimeField(auto_now_add=True)
