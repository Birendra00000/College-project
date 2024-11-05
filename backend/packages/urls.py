from .models import User,Activities,Packages,Destinations,Booking,Bookmark,Review,LoginRecord
from django.urls import include, path
from rest_framework import routers, serializers, viewsets
from rest_framework.filters  import SearchFilter, OrderingFilter
from django_filters .rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from .viewsets import UserViewSet,UserRegistrationViewSet,UserProfileViewSet,ChangePasswordViewSet,ActivitiesViewSet,PackagesViewSet,DestinationsViewSet,BookingViewSet,BookmarkViewSet,ReviewViewSet
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)





# Routers provide a way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'user', UserViewSet)
router.register(r'activities', ActivitiesViewSet)
router.register(r'Packages', PackagesViewSet)
router.register(r'destinations', DestinationsViewSet)
router.register(r'bookmark', BookmarkViewSet)
router.register(r'review', ReviewViewSet)
router.register(r'user/register', UserRegistrationViewSet, basename='user-registration')




urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', UserRegistrationViewSet.as_view({'post': 'create'}), name='user_registration'),
    path('api/profile/', UserProfileViewSet.as_view({'post': 'create'}), name='user_profile'),
    path('api/change-password/', ChangePasswordViewSet.as_view(), name='change_password'),
]
