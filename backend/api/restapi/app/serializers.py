from rest_framework import serializers
from .models import ClothItem, WeatherRecord


class ClothItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClothItem


class WeatherRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherRecord
