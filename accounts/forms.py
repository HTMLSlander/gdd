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
        widget=forms.Select(attrs={'class': 'form-control'}) 
    )
    age = forms.IntegerField(min_value=1, max_value=120, required=False, widget=forms.NumberInput(attrs={'class': 'form-control'}))
    weight = forms.IntegerField(min_value=1, max_value=300, required=False, widget=forms.NumberInput(attrs={'class': 'form-control'}))

    class Meta:
        model = User
        fields = ['email', 'username', 'gender', 'age', 'weight', 'password1', 'password2']
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        if commit:
            user.save()
        return user
    
class CodeForm(forms.Form):
    verification_code = forms.CharField(max_length=6)