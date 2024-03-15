# Generated by Django 5.0.3 on 2024-03-15 12:18

from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Client",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("first_name", models.CharField(max_length=255)),
                ("second_name", models.CharField(max_length=255)),
                ("type_of_user", models.CharField(max_length=255)),
                ("vk_id", models.IntegerField()),
                ("departament", models.CharField(max_length=255)),
                ("institut", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="File",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=255)),
                ("url", models.CharField(max_length=255)),
                ("description", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="Proffessor",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("first_name", models.CharField(max_length=255)),
                ("second_name", models.CharField(max_length=255)),
                ("type_of_user", models.CharField(max_length=255)),
                ("vk_id", models.IntegerField()),
                ("departament", models.CharField(max_length=255)),
                ("institut", models.CharField(max_length=255)),
                ("curator_of_group", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="Student",
            fields=[
                ("id", models.IntegerField(primary_key=True, serialize=False)),
                ("first_name", models.CharField(max_length=255)),
                ("second_name", models.CharField(max_length=255)),
                ("group", models.CharField(max_length=255)),
                ("vk_id", models.IntegerField()),
                ("departament", models.CharField(max_length=255)),
                ("institut", models.CharField(max_length=255)),
            ],
        ),
    ]