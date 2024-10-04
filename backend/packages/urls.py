from django.urls import path
from .views import PackageListView

urlpatterns = [
    path('api/packages/', PackageListView.as_view(), name='package-list'),
]
