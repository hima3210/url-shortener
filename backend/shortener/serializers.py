from rest_framework import serializers
from .models import ShortenedURL

class ShortenedURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortenedURL
        fields = ['id', 'original_url', 'short_code', 'created_at', 'clicks']
        read_only_fields = ['id', 'short_code', 'created_at', 'clicks']

class CreateURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortenedURL
        fields = ['original_url']