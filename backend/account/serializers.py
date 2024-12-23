from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token
#from .models import UserProfile

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
    profile_photo = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'profile_photo']

    def update(self, instance, validated_data):
        # Update the username and email if they have changed
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        # Update the profile photo only if it's provided
        profile_photo = validated_data.get('profile_photo', None)
        if profile_photo:
            instance.profile_photo = profile_photo

        # Save the updated instance
        instance.save()
        return instance