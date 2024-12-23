# Generated by Django 5.1.3 on 2024-12-22 16:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packages', '0018_bookingitem_arrival_date_bookingitem_nationality_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookingitem',
            name='email',
            field=models.EmailField(default=0, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bookingitem',
            name='phone_number',
            field=models.CharField(default=1, max_length=20),
            preserve_default=False,
        ),
    ]
