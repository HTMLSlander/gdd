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
        send_code = CodeForm(request.POST)
        if send_code.is_valid() and form.is_valid():
            user = form.save(commit=False)
            email = form.cleaned_data['email']
            code = ''.join(random.choices('0123456789', k=6))
            
            user.save()
            profile = Profile.objects.create(user=user, verification_code=code)
            send_mail(
                "Get Daily Drink Code Verification",
                f"This is your code: {code}",
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
            )
            messages.success(request, 'Form submitted successfully!')
            return redirect('verify')
        else:
            print(form.errors)
            messages.error(request, 'There was an error. Please fix the highlighted fields.')
    else:
        form = RegisterForm()

    return render(request, 'registration/register.html', {'form' : form})

def verification_code(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        code = request.POST.get('code')

        try:
            user = User.objects.get(email=email)
            profile = Profile.objects.get(user=user)

            if profile.verification_code == code:
                profile.is_verified = True
                profile.save()
                return redirect("login")
            else:
                messages.error(request, "Invalid verification code.")
        except User.DoesNotExist:
            messages.error(request, "User not found.")
    return render(request, 'pages/verifiy.html')

class CustomLoginView(LoginView):
    template_name = 'account/login.html'

    def form_invalid(self, form):
        messages.error(self.request, 'Invalid username or password. Please try again.')
        return super().form_invalid(form)

def logout_view(request):
    logout(request)
    return redirect('home')


