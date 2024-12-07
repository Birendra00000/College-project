from .models import Activities,Packages,Destinations,BookingItem
from django.urls import include, path
from rest_framework import routers, serializers, viewsets
from rest_framework.filters  import SearchFilter, OrderingFilter
from django_filters .rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .viewsets import ActivitiesViewSet,PackagesViewSet,DestinationsViewSet,BookingItemViewSet,BookmarkViewSet


# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'activities', ActivitiesViewSet)
router.register(r'Packages', PackagesViewSet)
router.register(r'destinations', DestinationsViewSet)
router.register(r'bookingitem', BookingItemViewSet)
router.register(r'bookmark',BookmarkViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    
]
