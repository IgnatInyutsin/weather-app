from rest_framework import viewsets, mixins, permissions
from restapi.app.serializers import *
from restapi.app.models import *
from rest_framework.serializers import ValidationError
from restapi.app.weatherapi import cash_forecast
from datetime import datetime
from rest_framework.authtoken.models import Token
from django.db import transaction

class WeatherViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = WeatherRecord.objects.all()
    serializer_class = WeatherRecordSerializer
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        city = self.request.query_params.get("city", "")

        if city == "":
            return None

        cash_forecast(city)
        return WeatherRecord.objects.filter(day__gt=datetime.now(), city=city.upper())

class ClothViewSet(mixins.CreateModelMixin,
                   viewsets.GenericViewSet):
    queryset = ClothItem.objects.all()
    serializer_class = ClothItemPostSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        serializer = ClothItemPostSerializer(data=request.data)
        if serializer.is_valid():
            # получаем зарегистрированного пользователя
            user = Token.objects.get(key=request.headers.get("Authorization")[6:])
            # рассчитываем тепловое сопротивление
            thermal_resistance_min = 0.0098518285*(33-request.data.get("temperature_max")) - 0.1425
            thermal_resistance_max = 0.0098518285*(33-request.data.get("temperature_min")) - 0.1425
            # сохраняем объект
            obj = ClothItem(user=user,
                            name=request.data.get("name"),
                            temperature_min=request.data.get("temperature_min"),
                            temperature_max=request.data.get("temperature_max"),
                            type=request.data.get("type"),
                            thermal_resistance_min=thermal_resistance_min,
                            thermal_resistance_max=thermal_resistance_max)
            obj.save()
            #возвращаем 200
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            # если не прошел сериализацию - возвращаем error
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)