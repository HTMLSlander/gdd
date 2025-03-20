from django.core.mail import send_mail
from django.utils.timezone import localtime
from celery import shared_task
from .models import UserWaterIntake

@shared_task
def send_hydration_reminders(*args, **kwargs):
    now = localtime().strftime("%H:%M")
    users = UserWaterIntake.objects.all() 

    for user in users:
        # Ensure `reminder_times` is properly formatted (e.g., list or CSV string)
        if now in user.reminder_times.split(","):
            send_mail(
                "Get Daily Drink",
                f"Hey {user.user.username}, don't forget to drink {user.water_amount}L of water now!",
                "amineratit6@gmail.com",
                [user.user.email],
                fail_silently=False,
            )
