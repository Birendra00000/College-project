from rest_framework import serializers
from ..models import CustomUser

class CustomUserListSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class CustomUserRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class CustomUserWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'