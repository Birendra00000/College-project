# Generated by Django 5.1.3 on 2024-12-24 13:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('packages', '0002_alter_bookingitem_destination_name'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Booked',
        ),
    ]
