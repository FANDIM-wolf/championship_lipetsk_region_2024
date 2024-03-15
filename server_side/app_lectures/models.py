from django.db import models

# Create your models here.
class Client(models.Model):
	id = models.IntegerField(primary_key=True)
	first_name = models.CharField(max_length=255)
	second_name = models.CharField(max_length=255)
	type_of_user = models.CharField(max_length=255)
	vk_id = models.IntegerField()
	departament = models.CharField(max_length=255)
	institut = models.CharField(max_length=255)
class File(models.Model):
	id = models.IntegerField(primary_key=True)
	name = models.CharField(max_length=255)
	url = models.CharField(max_length=255)
	description= models.CharField(max_length=255)
class Proffessor(models.Model):
	id = models.IntegerField(primary_key=True)
	first_name = models.CharField(max_length=255)
	second_name = models.CharField(max_length=255)
	type_of_user = models.CharField(max_length=255)
	vk_id = models.IntegerField()
	departament = models.CharField(max_length=255)
	institut = models.CharField(max_length=255)
	curator_of_group = models.CharField(max_length=255)
class Student(models.Model):
	id = models.IntegerField(primary_key=True)
	first_name = models.CharField(max_length=255)
	second_name = models.CharField(max_length=255)
	group = models.CharField(max_length=255)  # замените 'type_of_user' на 'group'
	vk_id = models.IntegerField()
	departament = models.CharField(max_length=255)
	institut = models.CharField(max_length=255)
