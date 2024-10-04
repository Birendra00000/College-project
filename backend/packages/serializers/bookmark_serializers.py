from rest_framework import serializers
from ..models import Bookmark

class BookmarkListSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'packages', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class BookmarkRetrieveSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'packages', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']

class BookmarkWriteSerializers(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'packages', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']