# Generated by Django 5.0.3 on 2024-03-16 09:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("app_lectures", "0006_subject_and_group"),
    ]

    operations = [
        migrations.AddField(
            model_name="subject_and_group",
            name="employee_id",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                to="app_lectures.employee",
            ),
        ),
        migrations.AlterField(
            model_name="subject_and_group",
            name="group_id",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                to="app_lectures.group",
            ),
        ),
        migrations.AlterField(
            model_name="subject_and_group",
            name="subject_id",
            field=models.ForeignKey(
                default=0,
                on_delete=django.db.models.deletion.CASCADE,
                to="app_lectures.subject",
            ),
        ),
    ]
