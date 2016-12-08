from rest_framework import serializers

from .models import Image, AnimatedGif


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('image',)


class AnimatedGifSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnimatedGif
        fields = ('image',)
