# Generated by Django 5.0.3 on 2024-03-16 08:05

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app_lectures", "0004_alter_user_vkid"),
    ]

    operations = [
        migrations.AddField(
            model_name="employee",
            name="vkID",
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name="student",
            name="vkID",
            field=models.CharField(max_length=100, null=True),
        ),
    ]
