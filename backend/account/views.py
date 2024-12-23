from rest_framework.decorators import api_view
from account.serializers import RegistrationSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from account import signals
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = RegistrationSerializer(data = request.data)
        #permission_classes = [permissions.AllowAny]
        data = {}

        if serializer.is_valid():
            account = serializer.save()
            data['isAdmin'] = account.is_staff

            token = Token.objects.get(user = account).key
            data['token'] = token

        else:
            return Response(serializer.errors,status=400)
        return Response(data,status=201)


@api_view(['POST'])
def custom_login(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if email is None or password is None:
        return Response({'error': 'Email and password are required'}, status=400)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'Invalid email or password'}, status=400)

    user = authenticate(username=user.username, password=password)
    if not user:
        return Response({'error': 'Invalid email or password'}, status=400)

    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key, 'isAdmin': user.is_staff}, status=200)


#user profile
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_profile, created = UserProfile.objects.get_or_create(user=user)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)
        # try:
        #     profile = UserProfile.objects.get(user=request.user)
        #     serializer = UserProfileSerializer(profile)
        #     return Response(serializer.data, status=status.HTTP_200_OK)
        # except UserProfile.DoesNotExist:
        #     return Response({"error": "User profile not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            serializer = UserProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)