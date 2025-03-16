from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('home/', views.rankup_page, name='rankup'),
    # path('rewards/', views.rewards, name='rewards'),
    path('log_water/', views.log_water, name='log_water'),
    path('email/', views.email_save, name='email_support'),
    path('profile/', views.user_profile, name='profile'),

]


