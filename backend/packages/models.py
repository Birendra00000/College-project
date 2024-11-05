from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser



# Custom User model
class User(AbstractUser):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=200)
    gender = models.CharField(max_length=10, choices=[('Male', 'Male'), ('Female', 'Female')])
    date_of_birth = models.DateField()

    groups = models.ManyToManyField(
        'auth.Group',
        related_name="customuser_groups",  # Set a unique related name
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name="customuser_user_permissions",  # Set a unique related name
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.username


# Activity model
class Activities(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Package model
class Packages(models.Model):
    name = models.CharField(max_length=50)
    destination = models.CharField(max_length=255, default="Unknown Destination")
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    start_date = models.DateField(default='2023-01-01')
    end_date = models.DateField(default='2024-01-01')
    activities = models.ManyToManyField(Activities, related_name="packages")
    images = models.ImageField(upload_to='images/', blank=True, null=True) 
    def __str__(self):
        return self.name


# Destinations model
class Destinations(models.Model):
    name = models.CharField(max_length=100)
    packages = models.ManyToManyField(Packages, related_name="destinations")
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name


# Bookmark model
class Bookmark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookmarks")
    package = models.ForeignKey(Packages, on_delete=models.CASCADE, related_name="bookmarks")
    

    def __str__(self):
        return f"{self.user.username} bookmarked {self.package.name}"


# Booking model
class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    package = models.ForeignKey(Packages, on_delete=models.CASCADE, related_name="bookings")
    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=50,
        choices=[('Pending', 'Pending'), ('Confirmed', 'Confirmed'), ('Cancelled', 'Cancelled')],
        default='Pending'
    )

    def __str__(self):
        return f"Booking by {self.user.username} for {self.package.name}"


# Review model
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reviews")
    package = models.ForeignKey(Packages, on_delete=models.CASCADE, related_name="reviews")
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField()
    def __str__(self):
        return f"Review by {self.user.username} for {self.package.name}"


# Login model to track user login times
class LoginRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="login_records")
    login_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Login record for {self.user.username} at {self.login_time}"
