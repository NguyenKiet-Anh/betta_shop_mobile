# Generated by Django 4.2.16 on 2024-11-20 03:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_remove_mathang_hinhanh_mathang_hinhanh1_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='mathang',
            name='GiaKhuyenMai',
            field=models.DecimalField(decimal_places=4, default=0, max_digits=12),
        ),
    ]
