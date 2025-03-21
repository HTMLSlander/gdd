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
    gender = forms.ChoiceField(
        choices=[('male', 'Male'), ('female', 'Female')], 
        required=False,
        widget=forms.Select(attrs={'class': 'custom-select'}) 
    )
    age = forms.IntegerField(min_value=1, max_value=120, required=False)
    weight = forms.IntegerField(min_value=1, max_value=300, required=False)

    class Meta:
        model = User
        fields = ['email', 'username' , 'gender', 'age', 'weight' ,'password1', 'password2',]
    
class CodeForm(forms.Form):
    verification_code = forms.CharField(max_length=6)