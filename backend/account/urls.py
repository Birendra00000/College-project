from django.urls import path
#from rest_framework.authtoken.views import obtain_auth_token
from account import views

urlpatterns = [
    path('login/',views.custom_login, name="login"),
    path('register/',views.register, name = "register"),
]