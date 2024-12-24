from django.conf import settings
from django.db.models.signals import post_save,pre_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import UserProfile

def updateUser(sender,instance,**kwargs):
    user = instance
    # Only set the username to email if it's not already set
    if not user.username and user.email:
        user.username = user.email
pre_save.connect(updateUser, sender=User)

@receiver(post_save,sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender,instance=None,created=False,**kwargs):
    if created:
        Token.objects.create(user = instance)


@receiver(post_save, sender=User)
def manage_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    else:
        if hasattr(instance, 'userprofile'):
            instance.userprofile.save()