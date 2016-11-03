from django.contrib import admin

from .models import Image


@admin.register(Image)
class AuthorAdmin(admin.ModelAdmin):
    pass
