from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.db.models.signals import post_save


# from .models import Profile

# class UserProfileForm(forms.ModelForm):
#     class Meta:
#         model = Profile
#         fields = '__all__'

class RegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['email', 'username' ,'password1', 'password2']
    
class CodeForm(forms.Form):
    verification_code = forms.CharField(max_length=6)