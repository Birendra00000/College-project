from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import UserProfile

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    role = serializers.ChoiceField(choices=[('user', 'User'), ('admin', 'Admin')], default='user')
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password', 'role', 'isAdmin']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def get_isAdmin(self, obj):
        # Return the admin status based on is_staff
        return obj.is_staff

    def validate(self, data):
        # Validate password and confirm_password match
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError({'error': "Password and confirm password must be the same!"})

        # Check if email already exists
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({'error': 'Email is already taken'})

        return data

    def create(self, validated_data):
        # Get role from the data (defaults to 'user' if not provided)
        role = validated_data.get('role', 'user')
        
        # If the role is admin, set is_staff to True
        is_staff = True if role == 'admin' else False

        # Create the new user and set the password
        password = validated_data['password']
        username = validated_data['username']  # Use username as provided
        email = validated_data['email'] 
        user = User(
            email=validated_data['email'],
            username=validated_data['username'],
            is_staff=is_staff,  # Set the is_staff based on role
        )
        user.set_password(password)
        user.save()

        # Create token for the new user
        Token.objects.get_or_create(user=user)

        return user


#user profile
class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    profile_photo = serializers.ImageField(required=False)
    gender = serializers.ChoiceField(choices=[('male', 'Male'), ('female', 'Female'), ('other', 'Other')], required=False)

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'profile_photo', 'address', 'phone', 'about_you', 'date_of_birth', 'gender']

    def update(self, instance, validated_data):
        # Ensure that username and email are updated on the user model
        user = instance.user
        user.username = validated_data.get('username', user.username)
        user.email = validated_data.get('email', user.email)
        user.save()

        # Now update other profile fields
        instance.profile_photo = validated_data.get('profile_photo', instance.profile_photo)
        instance.address = validated_data.get('address', instance.address)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.about_you = validated_data.get('about_you', instance.about_you)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.save()

        return instance