# Generated by Django 4.2.16 on 2024-11-20 03:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mathang',
            name='HinhAnh',
        ),
        migrations.AddField(
            model_name='mathang',
            name='HinhAnh1',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='mathang',
            name='HinhAnh2',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='mathang',
            name='HinhAnh3',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AddField(
            model_name='mathang',
            name='HinhAnh4',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
