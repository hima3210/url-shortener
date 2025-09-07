from django.urls import path
from . import views

urlpatterns = [
    path('api/shorten/', views.CreateShortURLView.as_view(), name='create_short_url'),
    path('api/urls/', views.URLListView.as_view(), name='url_list'),
    path('api/stats/<str:short_code>/', views.URLStatsView.as_view(), name='url_stats'),
    path('<str:short_code>/', views.redirect_url, name='redirect_url'),
]