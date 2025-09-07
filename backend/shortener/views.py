from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse, HttpResponseRedirect
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import ShortenedURL
from .serializers import ShortenedURLSerializer, CreateURLSerializer

class CreateShortURLView(generics.CreateAPIView):
    serializer_class = CreateURLSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()
        
        response_serializer = ShortenedURLSerializer(instance)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

class URLListView(generics.ListAPIView):
    queryset = ShortenedURL.objects.all().order_by('-created_at')
    serializer_class = ShortenedURLSerializer

def redirect_url(request, short_code):
    url_obj = get_object_or_404(ShortenedURL, short_code=short_code)
    url_obj.clicks += 1
    url_obj.save()
    return HttpResponseRedirect(url_obj.original_url)

class URLStatsView(APIView):
    def get(self, request, short_code):
        url_obj = get_object_or_404(ShortenedURL, short_code=short_code)
        serializer = ShortenedURLSerializer(url_obj)
        return Response(serializer.data)
