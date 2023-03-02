from django.db import models
from .utils import WEAR_CLO, get_alpha, get_general_wear_recomendation



class WeatherRecord(models.Model):
    city = models.CharField("Город", max_length=170)
    day = models.DateTimeField("Дата измерения")
    pressure = models.DecimalField(
        "Атмосферное давление",
        max_digits=4,
        decimal_places=0
    )
    humidity = models.DecimalField("Влажность", max_digits=4, decimal_places=0)
    temperature = models.DecimalField("Средняя температура", max_digits=4, decimal_places=0)
    wind_speed = models.DecimalField(
        "Скорость ветра",
        max_digits=3,
        decimal_places=1
    )
    general_recomendation = models.FloatField(
        "Общая рекомендация выбора одежды",
        choices=WEAR_CLO,
        default=0.3
    )

    def __str__(self):
        return f"<Weather for {self.day} in {self.city}>"

    def calculate_CLO(self):
        N = 2.66448
        J = (0.15 * (33 - float(self.temperature)) / N) - (5.7 / get_alpha(self.wind_speed))
        R = 0.175 * J
        CLO = R / 0.155
        return CLO

    def clean(self) -> None:
        self.general_recomendation = get_general_wear_recomendation(self.calculate_CLO())[0]

    class Meta:
        verbose_name = "Погодное измерение"
        verbose_name_plural = "Погодные измерения"
        constraints = [
            models.UniqueConstraint(fields=["day", "city"], name="unique_day_city")
        ]


class ClothItem(models.Model):
    class ClothTypes(models.IntegerChoices):
        OUTERWEAR = 1, "Верхняя одежда"
        HEADGEAR = 2, "Головной убор"
        SOCKS = 3, "Чулочно-носочные изделия"
        GLOVES = 4, "Перчаточные изделия"
        SCARFS = 5, "Шарфы/платки"
        SHOES = 6, "Обувь"

    name = models.CharField("Название одежды", max_length=200)
    image_url = models.URLField("Ссылка на изображение", blank=True, null=True)
    temperature_min = models.IntegerField("Минимальная температура")
    temperature_max = models.IntegerField("Максимальная температура")
    type = models.IntegerField("Тип одежды", choices=ClothTypes.choices)
    thermal_resistance = models.FloatField("Тепловая устойчивость")

    def __str__(self):
        return self.name

    def clean(self) -> None:
        super().clean()
        if self.temperature_min >= self.temperature_max:
            raise self.ValidationError("Максимальная температура должна быть больше минимальной")

    class Meta:
        verbose_name = "Элемент одежды"
        verbose_name_plural = "Элементы одежды"
