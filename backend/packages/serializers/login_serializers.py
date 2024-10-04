from rest_framework import serializers
from ..models import Login

class LoginListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'

class LoginRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'

class LoginWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = '__all__'