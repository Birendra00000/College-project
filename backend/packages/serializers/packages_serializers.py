from rest_framework import serializers
from ..models import Packages

class PackagesListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Packages
        fields = '__all__'

class PackagesRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = Packages
        fields = '__all__'

class PackagesWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Packages
        fields = '__all__'