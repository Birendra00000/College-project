from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group, Permission
from django.contrib.auth import get_user_model

User = get_user_model() 
# Create your models here.
class Activities(models.Model):
    name = models.CharField(max_length=100)

class Packages(models.Model):
    name = models.CharField( max_length=50)
    destination = models.CharField(max_length=255, default="Unknown Destination")
    images =models.ImageField( upload_to='packages')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    start_date = models.DateField(default='2023-01-01')
    end_date = models.DateField(default='2024-01-01')
    activities =  models.ManyToManyField(Activities)

class Destinations(models.Model):
    name = models.CharField(max_length=100)
    packages = models.ManyToManyField(Packages)
    price =  models.DecimalField(max_digits=10, decimal_places=2)



class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    packages = models.ForeignKey('Packages', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} bookmarked {self.package.name}"


class Booking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    packages = models.ForeignKey(Packages, on_delete=models.CASCADE)
    booking_date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=[('Pending', 'Pending'), ('Confirmed', 'Confirmed'), ('Cancelled', 'Cancelled')])

    def __str__(self):
        return f"Booking by {self.user.username} for {self.package.title}"

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    packages = models.ForeignKey(Packages, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.package.title}"


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    # Override the related names for groups and user_permissions
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # Change this to a unique name
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # Change this to a unique name
        blank=True,
    )

    def __str__(self):
        return self.username
