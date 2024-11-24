from rest_framework.decorators import api_view
from account.serializers import RegistrationSerializer
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from account import signals

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