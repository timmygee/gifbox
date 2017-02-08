from rest_framework import viewsets, mixins
from django_filters.rest_framework import FilterSet, DjangoFilterBackend
from django_filters import DateFilter

from .serializers import ImageSerializer, AnimatedGifSerializer
from .models import Image, AnimatedGif


class ImageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ImageSerializer
    queryset = Image.objects.all()


class AnimatedGifFilterSet(FilterSet):
    min_time = DateFilter(name='created', lookup_expr='gte')
    max_time = DateFilter(name='created', lookup_expr='lte')

    class Meta:
        model = AnimatedGif
        fields = ('period', 'min_time', 'max_time')


class AnimatedGifViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AnimatedGif.objects.all()
    serializer_class = AnimatedGifSerializer
    filter_class = AnimatedGifFilterSet
    filter_backends = (DjangoFilterBackend,)
