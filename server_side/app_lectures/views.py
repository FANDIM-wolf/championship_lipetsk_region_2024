from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
import json
import pandas as pd
from sklearn.neural_network import MLPRegressor
import os
import joblib
from django.shortcuts import render
from rest_framework import status
from django.http import JsonResponse , HttpResponse 
import random
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from .models import User, Student, Employee , Token , Group , Employee_and_group ,File , Subject_and_group , Subject ,Homework
import string
from rest_framework.renderers import JSONRenderer
#генерируем уникальный токен из 20 символов
def generate_token():
    characters = string.ascii_letters + string.digits + "_$"
    token = ''.join(random.choice(characters) for _ in range(20))
    return token



@csrf_exempt
@api_view(['POST'])
def edit_user_data(request):
    data = request.data
    email = data["email"]
    type_of_user = data["typeOfUser"]
    name = data["name"]
    department = data["department"]
    group = data["group"]
    institute = data["institute"]
    vkid = data["vkid"]

    # Проверка на существующего пользователя по vkid и email
    existing_user = User.objects.filter(vkID=vkid, email=email).first()

    if existing_user:
        if existing_user.type_of_user == "студент":
            existing_student = Student.objects.get(client_id=existing_user.id)
            existing_student.email = email
            existing_student.department = department
            existing_student.group = group
            existing_student.save()
            # Обновление существующего пользователя
            existing_user.email = email
            existing_user.save()
            return JsonResponse({'message': 'User and student role edited successfully'})
        if existing_user.type_of_user == "сотрудник":
            existing_employee = Employee.objects.get(client_id=existing_user.id)
            existing_employee.email = email
            existing_employee.department = department
            existing_employee.position = group
            existing_employee.save()
            # Обновление существующего пользователя
            existing_user.email = email
            existing_user.save()
            return JsonResponse({'message': 'User and student role edited successfully'})
    else:
        # Создание нового пользователя
        user = User.objects.create(email=email, vkID=vkid, type_of_user=type_of_user)
        if type_of_user == "студент":
            student, created = Student.objects.get_or_create(name=name, department=department, group=group, institute=institute, client_id=user.id)
            return JsonResponse({'message': 'User and student role created successfully'})
        elif type_of_user == "сотрудник":
            employee, created = Employee.objects.get_or_create(name=name, department=department, position=group, institute=institute, client_id=user.id)
            return JsonResponse({'message': 'User and employee role created successfully'})


@csrf_exempt
@api_view(['POST'])
def upload_file_and_save(request):
    if request.method == 'POST' and request.FILES['file']:
        file = request.FILES['file']
        file_name = file.name
        file_path = os.path.join('media', file_name)

        # Создаем папку media, если она не существует
        if not os.path.exists('media'):
            os.makedirs('media')

        with open(file_path, 'wb') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        return HttpResponse("Файл успешно загружен и сохранен в папке media.")
    else:
        return HttpResponse("Ошибка при загрузке файла.")

@csrf_exempt
@api_view(['POST'])
def create_group_with_token(request):
    if request.method == 'POST':
        data = request.data
        group_name = data["groupName"]

        vkid = data["vkid"]

        if not group_name or not vkid:
            return Response("Необходимо указать название группы и vkid", status=status.HTTP_400_BAD_REQUEST)

       
        # Находим сотрудника по vkid 
        employee = Employee.objects.filter(vkID=vkid).first()

        if not employee:
            return Response("Сотрудник с указанным vkid не найден", status=status.HTTP_404_NOT_FOUND)

        # Проверяем наличие токена для данной группы
        existing_token = Token.objects.filter(group_id__name=group_name).first()

        if existing_token:
            # Генерируем новый уникальный токен
            while True:
                token_value = ''.join(random.choices(string.ascii_letters + string.digits + "_$", k=20))
                if not Token.objects.filter(token_value=token_value).exists():
                    break
            # Создаем группу
            new_group = Group.objects.create(name=group_name, department=employee.department, institute=employee.institute)
            # Сохранение токена и связь с группой и сотрудником
            group_token = Token.objects.create(group_id=new_group, token_value=token_value)
            Employee_and_group.objects.create(group_id=new_group, employee_id=employee)
        else:
            # Создаем группу
            new_group = Group.objects.create(name=group_name, department=employee.department, institute=employee.institute)

            # Генерация нового токена
            token_value = ''.join(random.choices(string.ascii_letters + string.digits + "_$", k=20))

            # Сохранение токена и связь с группой и сотрудником
            group_token = Token.objects.create(group_id=new_group, token_value=token_value)
            Employee_and_group.objects.create(group_id=new_group, employee_id=employee)

        return Response({"token": token_value}, status=status.HTTP_201_CREATED)

#Получить токены и группы которые доступны сотруднику (преподователь , доктор технических наук)
@api_view(['POST'])
def get_available_tokens(request):
    data = request.data
    vkid = data.get('vkid')
    
    if vkid:
        try:
            employee = Employee.objects.get(vkID=vkid)
            employee_groups = Employee_and_group.objects.filter(employee_id=employee)
            group_ids = [group.group_id_id for group in employee_groups]
            available_tokens = Token.objects.filter(group_id__in=group_ids).values_list('token_value', flat=True)
            group_names = Group.objects.filter(id__in=group_ids).values_list('name', flat=True)
            
            response_data = {
                'available_tokens': list(available_tokens),
                'available_groups': list(group_names)
            }
            
            return Response(response_data)
        except Employee.DoesNotExist:
            return Response({'error': 'Employee not found'}, status=404)
    else:
        return Response({'error': 'VKID parameter missing'}, status=400)

#Для каждого преподователя есть свой предмет/ы
@api_view(['POST'])
def register_subject(request):
    data = request.data
    vkid = data['vkid']
    group_token = data['group_token']
    subject_name = data['subject_name']

    try:
        #поиск токена
        token = Token.objects.get(token_value=group_token)
        #поиск сотрудника по вк id
        employee = Employee.objects.get(vkID=vkid)
        group = token.group_id
        #return Response({'status': group_id.id}, status=200)
        if Subject_and_group.objects.filter(employee_id=employee, group_id=group, subject_name=subject_name).exists():
            return Response({'status': 'Subject and Group already registered'}, status=200)
        else:
            employee = Employee.objects.get(vkID=vkid)
            group = Group.objects.get(id=group.id)
            subject = Subject.objects.get(name=subject_name)

            subject_group = Subject_and_group.objects.create(
                group_id=group,
                subject_id=subject,
                employee_id=employee,
                subject_name=subject.name,
                group_name=group.name
            )
            return Response({'status': 'Subject and Group already registered yes'}, status=200)

    except Token.DoesNotExist:
        return Response({'error': 'Token not found'}, status=404)

@api_view(['POST'])
def create_homework(request):
    data = request.data
    vkid = data['vkid']

    # Retrieve user type based on vkid (Assuming User model has a field for user type)
    # Check if user is an employee
    # Proceed if user is an employee
    try:
        employee = Employee.objects.get(vkID=vkid)
        group_name = data['group_name']
        subject_name = data['subject_name']

        # Check correspondence of employee with group and group with subject
        if Employee_and_group.objects.filter(employee_id=employee, group_id__name=group_name).exists() and \
           Subject_and_group.objects.filter(group_id__name=group_name, subject_id__name=subject_name).exists():
            
            description = data.get('description')
            group = Group.objects.get(name=group_name)
            subject = Subject.objects.get(name=subject_name)

            # Create Homework object
            homework = Homework.objects.create(
                name="Homework Name",  # You can set a specific name or use data['name']
                group_id=group,
                subject_id=subject,
                description=description,
                vkID=vkid
            )

            return Response({'status': 'Homework created successfully'}, status=200)

        else:
            return Response({'error': 'Employee not assigned to specified group or Group not assigned to specified subject'}, status=400)

    except Employee.DoesNotExist:
        return Response({'error': 'Employee not found'}, status=404)


@api_view(['POST'])
def get_homeworks_by_vkid(request):
    vkid = request.data.get('vkid')
    try:
        user = User.objects.get(vkID=vkid)
        if user.type_of_user == 'студент':
            homeworks = Homework.objects.filter(vkID=vkid)

            # Преобразование QuerySet в список словарей для возврата данных
            serialized_homeworks = []
            for homework in homeworks:
                serialized_homeworks.append({
                    'id': homework.id,
                    'name': homework.name,
                    'description': homework.description,
                    # Добавьте другие поля, которые вам необходимы
                })

            return Response(serialized_homeworks, status=status.HTTP_200_OK)
        elif user.type_of_user == 'сотрудник':
            homeworks = Homework.objects.filter(vkID=vkid)
            # Преобразование QuerySet в список словарей для возврата данных
            serialized_homeworks = []
            for homework in homeworks:
                serialized_homeworks.append({
                    'id': homework.id,
                    'name': homework.name,
                    'description': homework.description,
                    # Добавьте другие поля, которые вам необходимы
                })

            return Response(serialized_homeworks, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Invalid user type"}, status=status.HTTP_400_BAD_REQUEST)

        
    except User.DoesNotExist:
        return Response({"error": vkid }, status=status.HTTP_200_OK)




def get_homework_details(request, homework_id):
    try:
        homework = Homework.objects.get(id=homework_id)
        homework_data = {
            'name': homework.name,
            'group_id': homework.group_id,
            'subject_id': homework.subject_id,
            'description': homework.description,
            'vkID': homework.vkID
        }
        
        response = Response(homework_data, status=status.HTTP_200_OK)
        response.accepted_renderer = JSONRenderer()
        
        return response
    except Homework.DoesNotExist:
        return Response({"error": "Homework not found"}, status=status.HTTP_404_NOT_FOUND)

