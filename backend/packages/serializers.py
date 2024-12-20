from .models import Activities,Packages,Payment,Destinations,BookingItem,Bookmark
from rest_framework import serializers
from django.contrib.auth.models import User

class ActivitiesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Activities
        fields = ['url', 'activity_name']

class PackagesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Packages
        fields = ['url', 'package_name']
    
# class DestinationsSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Destinations
#         fields = ['url', 'destination_name','images','images_1','images_2', 'packages', 'price','itinerary'#'rating','review'
#         ]

class DestinationsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destinations
        fields = ['id', 'destination_name', 'images', 'images_1', 'images_2', 'description', 'price', 'itinerary', #'rating', 
        'review']

class DestinationsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destinations
        fields = ['id', 'destination_name', 'images', 'images_1', 'images_2', 'description', 'price', 'itinerary', #'rating', 
        'review']


class BookingItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingItem
        fields = ['id', 'destination_name', 'booking_date', 'status', 'number_of_people']
        read_only_fields = ['user', 'booking_date']

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'destinations', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']
    
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'