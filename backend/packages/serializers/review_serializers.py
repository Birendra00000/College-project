from rest_framework import serializers
from ..models import Review

class ReviewListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReviewRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'

class ReviewWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'