from rest_framework import serializers
from ..models import Booking

class BookingListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class BookingRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class BookingWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'