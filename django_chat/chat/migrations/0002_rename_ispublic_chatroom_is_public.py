# Generated by Django 4.2.3 on 2023-07-21 15:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatroom',
            old_name='isPublic',
            new_name='is_public',
        ),
    ]
