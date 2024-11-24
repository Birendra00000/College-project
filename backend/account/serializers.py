from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

class RegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    is_staff = serializers.BooleanField(default=False)
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirm_password','is_staff','isAdmin' #'first_name', 'last_name',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def get_isAdmin(self, obj):
        return obj.is_staff

    def save(self):
        password = self.validated_data['password']
        confirm_password = self.validated_data['confirm_password']

        if confirm_password != password:
            raise serializers.ValidationError({'error': "Password and confirm password must be the same!"})

        current_email = User.objects.filter(email=self.validated_data['email'])

        if current_email.exists():
            raise serializers.ValidationError({'error': 'Email is already taken'})

        account = User(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
            #first_name=self.validated_data['first_name'],
            #last_name=self.validated_data['last_name'],
            is_staff=self.validated_data.get('is_staff', False)
        )
        account.set_password(self.validated_data['password'])
        account.save()

        # Create token for the new user
        Token.objects.get_or_create(user=account)

        return account
