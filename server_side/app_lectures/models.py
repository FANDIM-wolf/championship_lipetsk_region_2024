from django.db import models
class User(models.Model):
    id = models.AutoField(primary_key=True)
    vkID = models.CharField(max_length=100 , null=True)
    email = models.EmailField()
    type_of_user = models.CharField(max_length=100)  # Поле типа текст

class Student(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    group = models.CharField(max_length=50)
    institute = models.CharField(max_length=100)
    client_id = models.ForeignKey('User', on_delete=models.CASCADE)
    vkID = models.CharField(max_length=100 , null=True)

class Employee(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    position = models.CharField(max_length=50)
    institute = models.CharField(max_length=100)
    client_id = models.ForeignKey('User', on_delete=models.CASCADE)
    vkID = models.CharField(max_length=100 , null=True)

class Group(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    institute = models.CharField(max_length=100)

class Subject(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

class Homework(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    group_id = models.ForeignKey('Group', on_delete=models.CASCADE)
    subject_id = models.ForeignKey('Subject', on_delete=models.CASCADE)
    description = models.TextField()
    vkID = models.CharField(max_length=100 , null=True)

class File(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    homework_id = models.ForeignKey('Homework', on_delete=models.CASCADE)
class Token(models.Model):
    id =models.AutoField(primary_key=True)
    group_id = models.ForeignKey('Group', on_delete=models.CASCADE)
    token_value = models.CharField(max_length=20)
class Employee_and_group(models.Model):
    id =models.AutoField(primary_key=True)
    group_id = models.ForeignKey('Group', on_delete=models.CASCADE)
    employee_id = models.ForeignKey('Employee', on_delete=models.CASCADE)
class Subject_and_group(models.Model):
    id =models.AutoField(primary_key=True)
    group_id = models.ForeignKey('Group', on_delete=models.CASCADE , default=0)
    subject_id = models.ForeignKey('Subject', on_delete=models.CASCADE , default=0)
    employee_id = models.ForeignKey('Employee', on_delete=models.CASCADE , default=0)
    subject_name = models.CharField(max_length=100)
    group_name = models.CharField(max_length=100)
# Create your models here.
# Create your models here.
