from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.views.generic import RedirectView

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include('app_lectures.urls')),  # Подключение urls из приложения api_bank
]
