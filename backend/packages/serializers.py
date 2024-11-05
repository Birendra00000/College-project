from .models import User,Activities,Packages,Destinations,Booking,Bookmark,Review,LoginRecord
from rest_framework import serializers

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
# serializers.py
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

# serializers.py
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class ActivitiesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Activities
        fields = ['url', 'name']

class PackagesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Packages
        fields = ['url','id', 'name','destination','description','price','start_date','end_date','activities']
    
class DestinationsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Destinations
        fields = ['url', 'name', 'packages', 'price']

class BookmarkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['url', 'user', 'package', 'publication_date']

class BookingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Booking
        fields = ['url', 'user', 'package', 'booking_date','status']

class ReviewSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Review
        fields = ['url', 'user', 'package', 'rating','comment']

class LoginrecordSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LoginRecord
        fields = ['url', 'user','login_time']



