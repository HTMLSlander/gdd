from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_view, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('login/', views.CustomLoginView.as_view(), name='login'),
]