from django.core.mail import send_mail
from django.utils.timezone import localtime
from celery import shared_task
from .models import UserWaterIntake


@shared_task
def send_hydration_reminders(*args, **kwargs):
    now = localtime().strftime("%H:%M")
    users = UserWaterIntake.objects.all() 

    for user in users:
        # Handle both list and comma-separated string formats
        reminder_times = user.reminder_times
        if isinstance(reminder_times, list):
            times = reminder_times
        else:
            # Handle comma-separated string
            times = [t.strip() for t in user.reminder_times.split(",")]
            
        if now in times:
            send_mail(
                "Get Daily Drink",
                f"Hey {user.user.username}, your water bottle is crying from neglect right now! 💧 Time to step up your hydration game and crush that {user.water_amount} goal! Are you going to let a little thing like thirst stand between you and greatness? I don't think so! Grab that bottle and show it who's boss! 💪 #StayHydratedOrGetDefeated",
                "amineratit6@gmail.com",
                [user.user.email],
                fail_silently=False,
            )