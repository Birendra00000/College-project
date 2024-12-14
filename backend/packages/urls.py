from django.urls import include, path
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .viewsets import (
    ActivitiesViewSet,
    PackagesViewSet,
    DestinationsViewSet,
    BookingItemViewSet,
    BookmarkViewSet,
    ViewBookmarkViewSet,
    DestinationDetailViewSet,
    SearchDestinationsViewSet,
    UpdateDestinationViewSet,
    DeleteDestinationViewSet,
)

# Define the router and register standard viewsets
router = DefaultRouter()
router.register(r'activities', ActivitiesViewSet)
router.register(r'packages', PackagesViewSet)
router.register(r'destinations', DestinationsViewSet)
router.register(r'bookingitem', BookingItemViewSet)
router.register(r'bookmark', BookmarkViewSet)

urlpatterns = [
    path('', include(router.urls)),  # Include standard router URLs
    path('destinations/search/', SearchDestinationsViewSet.as_view({'get': 'list'}), name='search_destinations'),
    path('destinations/<int:pk>/update/', UpdateDestinationViewSet.as_view({'put': 'update'}), name='update_destination'),
    path('destinations/<int:pk>/delete/', DeleteDestinationViewSet.as_view({'delete': 'destroy'}), name='delete_destination'),
    path('bookmarks/view/', ViewBookmarkViewSet.as_view({'get': 'list'}), name='view_bookmarks'),
    path('destinations/<int:pk>/details/', DestinationDetailViewSet.as_view({'get': 'retrieve'}), name='destination_detail'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
