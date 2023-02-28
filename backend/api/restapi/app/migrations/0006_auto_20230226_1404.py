# Generated by Django 3.2.16 on 2023-02-26 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20230226_1226'),
    ]

    operations = [
        migrations.AddField(
            model_name='clothitem',
            name='temperature_max',
            field=models.IntegerField(default=1000, verbose_name='Максимальная температура'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='clothitem',
            name='thermal_resistence',
            field=models.FloatField(default=0, verbose_name='Тепловая устойчивость'),
            preserve_default=False,
        ),
    ]
