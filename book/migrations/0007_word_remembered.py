# Generated by Django 4.2 on 2023-08-18 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('book', '0006_book_font_color'),
    ]

    operations = [
        migrations.AddField(
            model_name='word',
            name='remembered',
            field=models.BooleanField(default=False),
        ),
    ]
