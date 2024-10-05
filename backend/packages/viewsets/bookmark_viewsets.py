from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Bookmark
from ..serializers.bookmark_serializers import BookmarkListSerializers, BookmarkRetrieveSerializers, BookmarkWriteSerializers
from ..utilities.importbase import *
from rest_framework.permissions import IsAuthenticated  # Import permissions
from rest_framework_simplejwt.authentication import JWTAuthentication  # Import authentication

class bookmarkViewsets(viewsets.ModelViewSet):
    """
    Viewset for managing bookmarks, allowing filtering, searching, and ordering.
    """
    serializer_class = BookmarkListSerializers
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated
    authentication_classes = [JWTAuthentication]  # Ensure the user is authenticated with JWT
    pagination_class = MyPageNumberPagination  # Add pagination if necessary
    queryset = Bookmark.objects.all()

    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    search_fields = ['id']
    ordering_fields = ['id']

    def get_queryset(self):
        user = self.request.user
        print(f"Authenticated user: {user}")
        queryset = super().get_queryset()
        return queryset.filter(user=user)

    def get_serializer_class(self):
        """
        Override get_serializer_class to use different serializers for different actions.
        """
        if self.action in ['create', 'update', 'partial_update']:
            return BookmarkWriteSerializers
        elif self.action == 'retrieve':
            return BookmarkRetrieveSerializers
        return super().get_serializer_class()

    def perform_create(self, serializer):
        """
        Override perform_create to automatically set the user to the logged-in user.
        """
        serializer.save(user=self.request.user)  # Save with the current logged-in user
