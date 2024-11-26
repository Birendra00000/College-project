from rest_framework.decorators import api_view
from account.serializers import RegistrationSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from account import signals
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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