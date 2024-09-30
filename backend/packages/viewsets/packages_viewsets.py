from rest_framework import viewsets
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from ..models import Packages
from ..serializers.packages_serializers import PackagesListSerializers, PackagesRetrieveSerializers, PackagesWriteSerializers
from ..utilities.importbase import *

class packagesViewsets(viewsets.ModelViewSet):
    serializer_class = PackagesListSerializers
    # permission_classes = [packagesPermission]
    # authentication_classes = [JWTAuthentication]
    #pagination_class = MyPageNumberPagination
    queryset = Packages.objects.all()

    filter_backends = [SearchFilter, DjangoFilterBackend, OrderingFilter]
    search_fields = ['id']
    ordering_fields = ['id']

    # filterset_fields = {
    #     'id': ['exact'],
    # }

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset
        #return queryset.filter(user_id=self.request.user.id)

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return PackagesWriteSerializers
        elif self.action == 'retrieve':
            return PackagesRetrieveSerializers
        return super().get_serializer_class()

    # @action(detail=False, methods=['get'], name="action_name", url_path="url_path")
    # def action_name(self, request, *args, **kwargs):
    #     return super().list(request, *args, **kwargs)

