from django.db import models
from django.contrib.auth.models import User
from django.utils.timezone import now

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
    RATING_CHOICES = [(i, f"{i}*") for i in range(1, 6)]  # Updates rating choices to 1–5 stars

    destination_name = models.CharField(max_length=100)
    packages = models.ManyToManyField('Packages', related_name="destinations")
    price = models.DecimalField(max_digits=10, decimal_places=2,default=0.0)
    images = models.ImageField(upload_to='images/', blank=True, null=True)
    images_1 = models.ImageField(upload_to='images/', blank=True, null=True)
    images_2 = models.ImageField(upload_to='images/', blank=True, null=True)
    description = models.CharField(max_length=2000)
    itinerary = models.IntegerField(choices=ITINERARY_CHOICES, blank=True, null=True)
    activities = models.ManyToManyField('Activities', related_name="destinations")
    rating = models.IntegerField(choices=RATING_CHOICES, blank=True, null=True)
    review = models.CharField(max_length=500,blank=True, null=True)
    location = models.CharField(max_length=100,blank=True, null=True)
    best_season = models.CharField(max_length=100,blank=True, null=True)
    map_image = models.ImageField(upload_to='images/', blank=True, null=True)
    pradesh = models.CharField(max_length=100,blank=True, null=True)


    def __str__(self):
        return self.destination_name

# Booking model
class BookingItem(models.Model):
    destination_name = models.ForeignKey(Destinations, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True,editable=False)
    nationality = models.CharField(max_length=100)
    start_date = models.DateField(null=True,blank=True)
    end_date = models.DateField(null=True,blank=True)
    email = models.EmailField(max_length=100)
    phone_number = models.CharField(max_length=20)
    total_price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    number_of_people = models.PositiveIntegerField(default=1)  # Number of items booked

    def save(self, *args, **kwargs):
        destination = self.destination_name
        number_of_days = (self.end_date - self.start_date).days
        self.total_price = destination.price * number_of_days * self.number_of_people
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Booking for {self.destination_name}"



# class Booked(models.Model):
#     class Status(models.TextChoices):
#         PENDING = 'pending', 'Pending'
#         ACCEPTED = 'accepted', 'Accepted'
#         NOTACCEPTED = 'notAccepted', 'Not Accepted'

#     user = models.ForeignKey(User, on_delete=models.CASCADE)  # User who booked
#     booked = models.ForeignKey(BookingItem, on_delete=models.CASCADE, related_name='booked_items')  # Booking item
#     start_date = models.DateField()  # Start date of the booking
#     end_date = models.DateField()  # End date of the booking
#     status = models.CharField(max_length=200, choices=Status.choices, default=Status.PENDING)  # Booking status
#     total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)  # Total price (calculated dynamically)

#     def __str__(self):
#         return f"{self.user.username} => {self.booked.destination_name} ({self.status})"

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