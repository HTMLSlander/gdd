from django.shortcuts import render, redirect
# from .forms import RegisterForm
from django.contrib.auth import logout
from django.contrib import messages
from django.contrib.auth.views import LoginView
from .forms import RegisterForm

# Create your views here.


def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Form submitted successfully!')
            return redirect('login')
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