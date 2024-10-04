from rest_framework import generics
from .models import Package
from .serializers import PackageSerializer
from rest_framework.filters import SearchFilter

class PackageListView(generics.ListAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    filter_backends = [SearchFilter]
    search_fields = ['destination', 'name', 'description']
    
    def get_queryset(self):
        queryset = super().get_queryset()

        # Optional filters for price and dates
        price_min = self.request.query_params.get('price_min')
        price_max = self.request.query_params.get('price_max')
        start_date = self.request.query_params.get('start_date')
        end_date = self.request.query_params.get('end_date')

        if price_min:
            queryset = queryset.filter(price__gte=price_min)
        if price_max:
            queryset = queryset.filter(price__lte=price_max)
        if start_date:
            queryset = queryset.filter(start_date__gte=start_date)
        if end_date:
            queryset = queryset.filter(end_date__lte=end_date)

        return queryset

