# Generated by Django 4.2 on 2023-08-22 10:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0013_remove_page_start_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='page',
            name='finished',
            field=models.BooleanField(default=False),
        ),
    ]
