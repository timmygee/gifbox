from rest_framework import serializers

from versatileimagefield.serializers import VersatileImageFieldSerializer

from .models import Image, AnimatedGif


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image',)

    image = VersatileImageFieldSerializer(
        sizes=[
            ('full_size', 'url'),
            ('thumbnail', 'thumbnail__200x200'),
        ]
    )


class AnimatedGifSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimatedGif
        fields = ('image',)

    image = VersatileImageFieldSerializer(
        sizes=[
            ('full_size', 'url'),
            ('thumbnail', 'thumbnail__200x200'),
        ]
    )
