from rest_framework import serializers
from ..models import Destinations

class DestinationsListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Destinations
        fields = '__all__'

class DestinationsRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = Destinations
        fields = '__all__'

class DestinationsWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Destinations
        fields = '__all__'