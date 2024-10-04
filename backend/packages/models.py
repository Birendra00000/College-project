from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

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

class User(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)



class Login(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    

class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    packages = models.ForeignKey('Packages', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} bookmarked {self.package.name}"