from django.shortcuts import render, redirect
# from .forms import RegisterForm
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth.views import LoginView
from .forms import RegisterForm, CodeForm
from django.core.mail import send_mail
import random
from django.conf import settings
from .models import Profile
from django.contrib.auth import get_user_model

# Create your views here.


User = get_user_model()

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.save()

            gender = form.cleaned_data.get(['gender'])
            age = form.cleaned_data.get(['age'])
            weight = form.cleaned_data.get(['weight'])

            Profile.objects.create(user=user, gender=gender, age=age, weight=weight)
            messages.success(request, 'Form submitted successfully!')
        else:
            print(form.errors)
            messages.error(request, 'There was an error. Please fix the highlighted fields.')
    else:
        form = RegisterForm()

    return render(request, 'registration/register.html', {'form' : form})


class CustomLoginView(LoginView):
    template_name = 'account/login.html'

    def form_invalid(self, form):
        messages.error(self.request, 'Invalid username or password. Please try again.')
        return super().form_invalid(form)

def logout_view(request):
    logout(request)
    return redirect('home')


