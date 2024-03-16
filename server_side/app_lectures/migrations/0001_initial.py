# Generated by Django 5.0.3 on 2024-03-15 16:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("vkID", models.CharField(max_length=100)),
                ("email", models.EmailField(max_length=254)),
                ("type_of_user", models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name="Student",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                ("department", models.CharField(max_length=100)),
                ("group", models.CharField(max_length=50)),
                ("institute", models.CharField(max_length=100)),
                (
                    "client_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app_lectures.user",
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Employee",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                ("department", models.CharField(max_length=100)),
                ("group", models.CharField(max_length=50)),
                ("institute", models.CharField(max_length=100)),
                (
                    "client_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="app_lectures.user",
                    ),
                ),
            ],
        ),
    ]
