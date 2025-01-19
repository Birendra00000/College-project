# utils.py or views.py
from django.core.mail import send_mail
from django.conf import settings

def send_login_email(user):
    subject = 'Login Notification - Yatra'
    message = f'Hello {user.first_name},\n\nYou have successfully logged in to your Yatra account.\n\nThank you for using Yatra!'
    from_email = settings.DEFAULT_FROM_EMAIL
    recipient_list = [user.email]

    try:
        send_mail(subject, message, from_email, recipient_list)
        print(f"Login email sent to {user.email}")
    except Exception as e:
        print(f"Error sending email: {e}")
