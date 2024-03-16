from django.contrib import admin
from .models import User  , Student , Employee , File ,Homework , Group ,Subject , Token ,Employee_and_group,Subject_and_group
admin.site.register(User)
admin.site.register(Employee)
admin.site.register(Student)
admin.site.register(Group)
admin.site.register(Subject)
admin.site.register(Homework)
admin.site.register(File)
admin.site.register(Token)
admin.site.register(Employee_and_group)
admin.site.register(Subject_and_group)
# Register your models here.
