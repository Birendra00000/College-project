from django.db import models

# Create your models here.
class Activities(models.Model):
    name = models.CharField(max_length=100)

class Packages(models.Model):
    name = models.CharField( max_length=50)
    images =models.ImageField( upload_to='packages')
    description = models.TextField()
    activities =  models.ManyToManyField(Activities)

class Destinations(models.Model):
    name = models.CharField(max_length=100)
    packages = models.ManyToManyField(Packages)
    price =  models.DecimalField(max_digits=10, decimal_places=2)

