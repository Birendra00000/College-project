from django.db import models

# Activity model
class Activities(models.Model):
    activity_name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.activity_name

# Package model
class Packages(models.Model):
    package_name = models.CharField(max_length=50)

    def __str__(self):
        return self.package_name

# Destinations model
class Destinations(models.Model):
    ITINERARY_CHOICES = [(i, f"{i} days") for i in range(1, 11)]  # Generates choices from 1 to 10 days

    destination_name = models.CharField(max_length=100)
    packages = models.ManyToManyField(Packages, related_name="destinations")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    images = models.ImageField(upload_to='images/', blank=True, null=True)
    itinerary = models.IntegerField(choices=ITINERARY_CHOICES)  
    activities = models.ManyToManyField(Activities, related_name="destinations")
    RATING_CHOICES = [(i, f"{i}*") for i in range(1, 5)]
    rating =  models.IntegerField(choices=RATING_CHOICES)
    review = models.CharField(max_length=500)

    # Dropdown for 1 to 10 days

    def __str__(self):
        return self.destination_name


# Booking model
class BookingItem(models.Model):
    destination_name = models.ForeignKey(Destinations, on_delete=models.CASCADE, related_name="bookings")
    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ('Pending', 'Pending'),
            ('Confirmed', 'Confirmed'),
            ('Cancelled', 'Cancelled')
        ],
        default='Pending'
    )
    number_of_people = models.PositiveIntegerField(default=1)  # Number of items booked

    def __str__(self):
        return f"Booking for {self.package_name} - Status: {self.status}"