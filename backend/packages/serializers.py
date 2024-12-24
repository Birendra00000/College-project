from rest_framework import serializers
from .models import Activities, Packages, Destinations, BookingItem, Bookmark, Payment
from django.contrib.auth.models import User
from decimal import Decimal

class ActivitiesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Activities
        fields = ['url', 'activity_name']

class PackagesSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Packages
        fields = ['url', 'package_name']

class DestinationsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destinations
        fields = ['id', 'destination_name', 'images', 'images_1', 'images_2', 'description', 'price', 'itinerary', 'review', 'location', 'best_season', 'map_image', 'pradesh']

class DestinationsDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destinations
        fields = '__all__'

    review = serializers.CharField(required=False)  # Optional for updates
    location = serializers.CharField(required=False)
    best_season = serializers.CharField(required=False)
    pradesh = serializers.CharField(required=False)

class BookingItemSerializer(serializers.ModelSerializer):
    destination_name = serializers.PrimaryKeyRelatedField(queryset=Destinations.objects.all())  # Use the ID for the destination

    class Meta:
        model = BookingItem
        fields = ['destination_name', 'start_date', 'end_date', 'number_of_people', 'total_price']

    def validate(self, data):
        destination = data.get('destination_name')

        if not destination:
            raise serializers.ValidationError("Destination is required.")

        # Ensure the price is numeric
        price = destination.price  # Access the price of the destination

        if price is None or not isinstance(price, (int, float, Decimal)):
            raise serializers.ValidationError("Destination price must be numeric.")

        start_date = data.get('start_date')
        end_date = data.get('end_date')

        if start_date and end_date:
            if end_date < start_date:
                raise serializers.ValidationError("End date cannot be before start date.")
            days = (end_date - start_date).days + 1  # Calculate the number of days
            number_of_people = data.get('number_of_people', 1)  # Default to 1 if not provided
            
            # Calculate the total price
            total_price = days * float(price) * number_of_people
            data['total_price'] = total_price  # Set the total price in the data

        return data


# class BookedSerializer(serializers.ModelSerializer):
#     user = serializers.CharField(source='user.username', read_only=True)  # User's username, read-only
#     booked = BookingItemSerializer()  # Nested BookingItem serializer
#     total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)  # Read-only total price
#     status = serializers.CharField(source='get_status_display', read_only=True)  # Read-only status

#     class Meta:
#         model = Booked
#         fields = ['id', 'user', 'booked', 'start_date', 'end_date', 'status', 'total_price']

#     def create(self, validated_data):
#         # Extract the 'booked' nested data (this should be a dictionary, not just an ID)
#         booked_data = validated_data.pop('booked')  # Extract 'booked' data from validated data
        
#         # Create the associated BookingItem instance
#         booked_instance = BookingItem.objects.create(**booked_data)  # Create the BookingItem
        
#         # Now create the Booked instance, associating the newly created BookingItem
#         booked_instance = Booked.objects.create(
#             booked=booked_instance,  # Assign the created BookingItem
#             **validated_data  # Pass the rest of the validated data
#         )
#         return booked_instance

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['id', 'user', 'destinations', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'
