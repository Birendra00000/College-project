from rest_framework import serializers
from ..models import User

class UserListSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'