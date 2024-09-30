from django.db import models

# Create your models here.
class Register(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)

class Signin(models.Model):
    email = models.EmailField(max_length=100)
    password = models.CharField(max_length=100)
    
