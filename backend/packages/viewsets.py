from rest_framework import viewsets
from .models import Activities,Packages,BookingItem,Destinations,Bookmark
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.views import APIView
from rest_framework import generics, permissions
from .serializers import ActivitiesSerializer,PackagesSerializer,BookingItemSerializer,DestinationsListSerializer,BookmarkSerializer,DestinationsDetailSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from django.conf import settings
from .serializers import PaymentSerializer
from .utils import initiate_payment
from rest_framework.response import Response
from rest_framework import status


class ActivitiesViewSet(viewsets.ModelViewSet):
    queryset = Activities.objects.all()
    serializer_class = ActivitiesSerializer
    filter_backends = [SearchFilter, OrderingFilter, DjangoFilterBackend]
    search_fields = ['activity_name']  # Only use fields that exist in CustomUser
    filterset_fields = {
        'activity_name': ['exact', 'icontains'],
    }
    #permission_classes = [IsAuthenticated]
    

class PackagesViewSet(viewsets.ModelViewSet):
    queryset = Packages.objects.all()
    serializer_class = PackagesSerializer
    permission_classes = [IsAuthenticated]
    search_fields = ['packages_name']
    



class DestinationsViewSet(viewsets.ModelViewSet):
    queryset = Destinations.objects.all()
    serializer_class = DestinationsListSerializer
    #permission_classes = [IsAuthenticated]
    def get_serializer_class(self):
        if self.action == 'retrieve':  # Detail view
            return DestinationsDetailSerializer
        return DestinationsListSerializer  # List view

    search_fields = ['destination_name']

class SearchDestinationsViewSet(viewsets.ModelViewSet):
    #permission_classes = [IsAuthenticated]
    queryset = Destinations.objects.all()
    serializer_class = DestinationsDetailSerializer
    def get(self, request,*args,**kwargs):
        query = request.query_params.get('name', '')
        if not query:
            return Response({"error": "No such destination"},status=status.HTTP_400_BAD_REQUEST)
        destinations = Destinations.objects.filter(destination_name__icontains=query)
        serializer = DestinationsListSerializer(destinations, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateDestinationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Destinations.objects.all()
    serializer_class = DestinationsDetailSerializer
    def put(self, request, pk):
        try:
            destination = Destinations.objects.get(pk=pk)
        except Destinations.DoesNotExist:
            return Response({"error": "Destination not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = DestinationsDetailSerializer(destination, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Destination updated successfully", "data": serializer.data}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DeleteDestinationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Destinations.objects.all()
    serializer_class = DestinationsDetailSerializer
    def delete(self, request, pk):
        try:
            destination = Destinations.objects.get(pk=pk)
            destination.delete()
            return Response({"message": "Destination deleted successfully"}, status=status.HTTP_200_OK)
        except Destinations.DoesNotExist:
            return Response({"error": "Destination not found"}, status=status.HTTP_404_NOT_FOUND)

class BookingItemViewSet(viewsets.ModelViewSet):
    queryset = BookingItem.objects.all()
    serializer_class = BookingItemSerializer
    permission_classes = [IsAuthenticated]
    
class BookmarkViewSet(viewsets.ModelViewSet):
    
    queryset = Bookmark.objects.all()
    serializer_class = BookmarkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Bookmark.objects.filter(user=self.request.user)
        return Bookmark.objects.none()

    def perform_create(self, serializer):
        # Automatically associate the logged-in user with the bookmark
        serializer.save(user=self.request.user)

class ViewBookmarkViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Bookmark.objects.all()
    serializer_class = BookingItemSerializer
    def get(self, request):
        bookmarks = Bookmark.objects.filter(user=request.user)
        serializer = BookmarkSerializer(bookmarks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class DestinationDetailViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Destinations.objects.all()
    serializer_class = DestinationsDetailSerializer
    def get(self, request, pk):
        try:
            destination = Destinations.objects.get(pk=pk)
        except Destinations.DoesNotExist:
            return Response({"error": "Destination not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = DestinationsDetailSerializer(destination)
        return Response(serializer.data, status=status.HTTP_200_OK)

#payment use if necessary otherwise you can integrate with react 

class PaymentViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            payment = serializer.save()
            response = initiate_payment(payment)
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentVerifyViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def create(self, request, *args, **kwargs):
        payment_id = request.data.get('payment_id')
        user_id = request.data.get('user_id')
        payment = Payment.objects.filter(id=payment_id, user_id=user_id).first()
        if payment:
            response = verify_payment(payment)
            return Response(response, status=status.HTTP_200_OK)
        return Response({'error': 'Payment not found'}, status=status.HTTP_404)


class PaymentStatusViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def list(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        booking_id = request.query_params.get('booking_id')
        payment = Payment.objects.filter(user_id=user_id, booking_id=booking_id).first()
        if payment:
            serializer = PaymentSerializer(payment)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)


class PaymentRefundViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]
    def create(self, request, *args, **kwargs):
        booking_id = request.data.get('booking_id')
        amount = request.data.get('amount')
        reason = request.data.get('reason')
        payment = Payment.objects.filter(booking_id=booking_id).first()
        if payment:
            response = process_refund(payment, amount, reason)
            return Response(response, status=status.HTTP_200_OK)
        return Response({'error': 'Payment not found'}, status=status.HTTP_404_NOT_FOUND)

    
