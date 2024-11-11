from rest_framework import viewsets
from .models import Activities,Packages,BookingItem,Destinations
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework import generics, permissions
from .serializers import ActivitiesSerializer,PackagesSerializer,BookingItemSerializer,DestinationsSerializer
from django.contrib.auth.models import User

class ActivitiesViewSet(viewsets.ModelViewSet):
    queryset = Activities.objects.all()
    serializer_class = ActivitiesSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['activity_name']  # Only use fields that exist in CustomUser
    filterset_fields = {
        'activity_name': ['exact', 'icontains'],
    }

class PackagesViewSet(viewsets.ModelViewSet):
    queryset = Packages.objects.all()
    serializer_class = PackagesSerializer


class DestinationsViewSet(viewsets.ModelViewSet):
    queryset = Destinations.objects.all()
    serializer_class = DestinationsSerializer


class BookingItemViewSet(viewsets.ModelViewSet):
    queryset = BookingItem.objects.all()
    serializer_class = BookingItemSerializer
    