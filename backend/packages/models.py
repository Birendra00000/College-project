from django.db import models
from django.contrib.auth.models import User
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
from django.db import models

class Destinations(models.Model):
    ITINERARY_CHOICES = [(i, f"{i} days") for i in range(1, 11)]  # Generates choices from 1 to 10 days
    RATING_CHOICES = [(i, f"{i}*") for i in range(1, 6)]  # Updates rating choices to 1–5 stars

    destination_name = models.CharField(max_length=100)
    packages = models.ManyToManyField('Packages', related_name="destinations")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    images = models.ImageField(upload_to='images/', blank=True, null=True)
    images_1 = models.ImageField(upload_to='images/', blank=True, null=True)
    images_2 = models.ImageField(upload_to='images/', blank=True, null=True)
    description = models.CharField(max_length=2000)
    itinerary = models.IntegerField(choices=ITINERARY_CHOICES, blank=True, null=True)
    activities = models.ManyToManyField('Activities', related_name="destinations")
    rating = models.IntegerField(choices=RATING_CHOICES, blank=True, null=True)
    review = models.CharField(max_length=500)
    location = models.CharField(max_length=100)
    best_season = models.CharField(max_length=100)
    map_image = models.ImageField(upload_to='images/', blank=True, null=True)
    pradesh = models.CharField(max_length=100)

    # New fields
    location = models.CharField(max_length=255, blank=True, null=True)  # Optional location field
    best_season = models.CharField(max_length=100, blank=True, null=True)  # Season to visit
    pradesh = models.CharField(max_length=50, blank=True, null=True)  # State/Province
    map_images = models.ImageField(upload_to='map_images/', blank=True, null=True)  # Map image field

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
        return f"Booking for {self.destination_name} - Status: {self.status}"

class Bookmark(models.Model):
    user = models.ForeignKey(User,on_delete =models.CASCADE, related_name='bookmarks')
    destinations = models.ForeignKey('Destinations', on_delete=models.CASCADE, related_name='bookmarks')
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when the bookmark was created

    def __str__(self):
        return f"{self.user.username} bookmarked {self.destinations.destination_name}"


class Payment(models.Model):
    booking = models.ForeignKey(BookingItem, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=255)
    status = models.CharField(max_length=50, default='pending')  # pending, successful, failed, refunded
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Payment for {self.booking} - {self.status}"