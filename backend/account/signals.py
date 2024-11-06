from django.conf import settings
from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User


def updateUser(sender,instance,**kwargs):
    user = instance
    if user.email != '':
        user.username = user.username

pre_save.connect(updateUser,sender=User)

@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user = instance)