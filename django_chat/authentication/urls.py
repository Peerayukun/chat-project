from django.urls import path
from . import views

urlpatterns = [
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('user', views.user, name='user'),
    path('logout', views.logout, name='logout'),
    path('update_profile',views.update_profile,name="update_profile")
]