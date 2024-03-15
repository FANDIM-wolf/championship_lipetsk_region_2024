from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import pandas as pd
from sklearn.neural_network import MLPRegressor
import os
import joblib
from django.shortcuts import render

from django.http import JsonResponse , HttpResponse 
from .models import Client
from django.shortcuts import get_object_or_404
@api_view(['POST'])
def authorize_client(request):
    data = request.data 
    first_name = data["name"]
    second_name = data["salary"]
    if first_name and second_name:
    	matching_clients = Client.objects.filter(first_name__icontains=first_name , second_name__icontains=second_name)
    	client_data = list(matching_clients.values())

    	return Response({'clients' , client_data})
    else:
    	return Response({'error': 'Please provide both first name and second name for the search.'}, status=400)


