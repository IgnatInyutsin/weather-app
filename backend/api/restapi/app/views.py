from rest_framework import viewsets, mixins, permissions
from restapi.app.serializers import WeatherRecordSerializer
from restapi.app.models import WeatherRecord
from rest_framework.serializers import ValidationError
from restapi.app.weatherapi import cash_forecast
from datetime import datetime

class WeatherViewSet(mixins.ListModelMixin,
                   viewsets.GenericViewSet):
    queryset = WeatherRecord.objects.all()
    serializer_class = WeatherRecordSerializer
    pagination_class = None
    permission_classes = (permissions.AllowAny,)

    def get_queryset(self):
        city = self.request.query_params.get("city", "")

        if city == "":
            return None

        cash_forecast(city)
        return WeatherRecord.objects.filter(day__gt=datetime.now())