from django.urls import path
from . import views
urlpatterns = [
   path('authorize_client/', views.authorize_client, name='authorize_client'),
    # Add other URL patterns for your app
]