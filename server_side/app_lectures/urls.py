from django.urls import path
from . import views
urlpatterns = [
   path('upload_file_and_save/', views.upload_file_and_save, name='upload_file_and_save'),
   path('edit_user_data/', views.edit_user_data, name='edit_user_data'),
   path('create_group_with_token/', views.create_group_with_token, name='create_group_with_token'),
   path('get_available_tokens/', views.get_available_tokens, name='get_available_tokens'),
   path('register_subject/', views.register_subject, name='register_subject'),
   path('create_homework/' , views.create_homework , name='create_homework'),
   path('get_homeworks_by_vkid/', views.get_homeworks_by_vkid, name='get_homeworks_by_vkid'),
   path('get_homework_details/<int:homework_id>/', views.get_homework_details , name='get_homework_details'),
   
    # Add other URL patterns for your app
]