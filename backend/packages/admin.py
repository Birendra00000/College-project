from django.contrib import admin
from .models import Activities,Packages,Destinations,BookingItem,Bookmark
# Register your models here.
admin.site.register([Activities,Packages,Destinations,BookingItem,Bookmark])

