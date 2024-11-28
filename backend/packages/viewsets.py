from rest_framework import viewsets
from .models import Activities,Packages,BookingItem,Destinations,Bookmark
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework import generics, permissions
from .serializers import ActivitiesSerializer,PackagesSerializer,BookingItemSerializer,DestinationsListSerializer,BookmarkSerializer,DestinationsDetailSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated


class ActivitiesViewSet(viewsets.ModelViewSet):
    queryset = Activities.objects.all()
    serializer_class = ActivitiesSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['activity_name']  # Only use fields that exist in CustomUser
    filterset_fields = {
        'activity_name': ['exact', 'icontains'],
    }
    #permission_classes = [IsAuthenticated]
    

class PackagesViewSet(viewsets.ModelViewSet):
    queryset = Packages.objects.all()
    serializer_class = PackagesSerializer
    #permission_classes = [IsAuthenticated]
    #authentication_classes = [JWTAuthentication]
    search_fields = ['packages_name']
    



#class DestinationsViewSet(viewsets.ModelViewSet):
#    queryset = Destinations.objects.all()
    # serializer_class = DestinationsSerializer
    # #permission_classes = [IsAuthenticated]
    # search_fields = ['destination_name']
    
class DestinationsViewSet(viewsets.ModelViewSet):
    queryset = Destinations.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':  # Detail view
            return DestinationsDetailSerializer
        return DestinationsListSerializer  # List view

    search_fields = ['destination_name']


class BookingItemViewSet(viewsets.ModelViewSet):
    queryset = BookingItem.objects.all()
    serializer_class = BookingItemSerializer
    #permission_classes = [IsAuthenticated]
    
class BookmarkViewSet(viewsets.ModelViewSet):
    
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Bookmark.objects.filter(user=self.request.user)
        return Bookmark.objects.none()

    def perform_create(self, serializer):
        # Automatically associate the logged-in user with the bookmark
        serializer.save(user=self.request.user)