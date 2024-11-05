from rest_framework import viewsets
from .models import User,Activities,Packages,Bookmark,Booking,Review,Destinations
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework import generics, permissions
from .serializers import UserRegistrationSerializer,UserProfileSerializer,ChangePasswordSerializer,ActivitiesSerializer,PackagesSerializer,BookmarkSerializer,BookingSerializer,ReviewSerializer,DestinationsSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  # Replace with CustomUser if applicable
    serializer_class = UserRegistrationSerializer
    
class UserRegistrationViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class ChangePasswordViewSet(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if not user.check_password(serializer.validated_data['old_password']):
                return Response({"old_password": "Wrong password."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response({"success": "Password changed successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ActivitiesViewSet(viewsets.ModelViewSet):
    queryset = Activities.objects.all()
    serializer_class = ActivitiesSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['name']  # Only use fields that exist in CustomUser
    ordering_fields = ['id']
    filterset_fields = {
        'name': ['exact', 'icontains'],
    }

class PackagesViewSet(viewsets.ModelViewSet):
    queryset = Packages.objects.all()
    serializer_class = PackagesSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['name','destination']  # Only use fields that exist in CustomUser
    ordering_fields = ['id']
    filterset_fields = {
        'name': ['exact', 'icontains'],
        'destination': ['exact', 'icontains'],
    }

class BookmarkViewSet(viewsets.ModelViewSet):
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['user']  # Only use fields that exist in CustomUser
    ordering_fields = ['id']
    filterset_fields = {
        'user': ['exact', 'icontains'],
    }

class DestinationsViewSet(viewsets.ModelViewSet):
    queryset = Destinations.objects.all()
    serializer_class = DestinationsSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['name']  # Only use fields that exist in CustomUser
    ordering_fields = ['id']
    filterset_fields = {
        'name': ['exact', 'icontains'],
    }

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    filter_backends = [SearchFilter, DjangoFilterBackend]
    search_fields = ['user']  # Only use fields that exist in CustomUser
    filterset_fields = {
        'package': ['exact', 'icontains'],
    }

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['package']  # Only use fields that exist in CustomUser
    ordering_fields = ['id']
    filterset_fields = {
        'rating': ['exact', 'icontains'],
    }