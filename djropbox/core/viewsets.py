from rest_framework import viewsets
from rest_framework import mixins

from .serializers import ImageSerializer
from .models import Image


class ImageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()
