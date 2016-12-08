from django.contrib import admin

from .models import Image, AnimatedGif


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    pass


@admin.register(AnimatedGif)
class AnimatedGifAdmin(admin.ModelAdmin):
    pass
