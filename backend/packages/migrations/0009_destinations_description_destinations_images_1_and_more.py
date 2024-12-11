# Generated by Django 5.1.3 on 2024-11-26 13:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('packages', '0008_remove_bookmark_package_bookmark_destinations'),
    ]

    operations = [
        migrations.AddField(
            model_name='destinations',
            name='description',
            field=models.CharField(default=1, max_length=10000),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='destinations',
            name='images_1',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
        migrations.AddField(
            model_name='destinations',
            name='images_2',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]