from django.urls import path
#from rest_framework.authtoken.views import obtain_auth_token
from account import views
from .views import UserProfileView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('login/',views.custom_login, name="login"),
    path('register/',views.register, name = "register"),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)