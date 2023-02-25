from django.db import models
from .utils import WindsEnum


class WeatherRecord(models.Model):
    city = models.CharField("Город", editable=False, max_length=170)
    day = models.DateField("Дата измерения", editable=False)
    pressure = models.DecimalField(
        "Атмосферное давление",
        max_digits=4,
        decimal_places=0
    )
    humidity = models.DecimalField("Влажность", max_digits=4, decimal_places=0)
    wind = models.CharField(
        "Направление ветра",
        max_length=2,
        choices=WindsEnum.to_tuples(),
        default=WindsEnum.NORTH.value
    )
    wind_speed = models.DecimalField(
        "Скорость ветра",
        max_digits=3,
        decimal_places=1
    )

    class Meta:
        verbose_name = "Погодное измерение"
        verbose_name_plural = "Погодные измерения"
        constraints = [
            models.UniqueConstraint(fields=["day", "city"], name="unique_day_city")
        ]
