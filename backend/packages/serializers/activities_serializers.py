from rest_framework import serializers
from ..models import Activities

class ActivitiesListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = '__all__'

class ActivitiesRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = '__all__'

class ActivitiesWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Activities
        fields = '__all__'