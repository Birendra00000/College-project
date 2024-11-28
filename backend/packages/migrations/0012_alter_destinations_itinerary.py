# Generated by Django 5.1.3 on 2024-11-28 16:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packages', '0011_destinations_images_destinations_images_1_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destinations',
            name='itinerary',
            field=models.IntegerField(blank=True, choices=[(1, '1 days'), (2, '2 days'), (3, '3 days'), (4, '4 days'), (5, '5 days'), (6, '6 days'), (7, '7 days'), (8, '8 days'), (9, '9 days'), (10, '10 days')]),
        ),
    ]
