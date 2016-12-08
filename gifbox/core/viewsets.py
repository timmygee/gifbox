from rest_framework import viewsets, mixins
from django_filters.rest_framework import FilterSet
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
        fields = ('period',)


class AnimatedGifViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AnimatedGifSerializer
    filter_class = AnimatedGifFilterSet
    queryset = AnimatedGif.objects.all()

    # TODO - check if this can be removed. AnimatedGifFilterSet may take care of it all
    def get_queryset(self):
        qs = super().get_queryset()

        filters = {}
        period = self.request.query_params.get('period', None)

        if period:
            filters['period'] = period

        return qs.filter(**filters)
