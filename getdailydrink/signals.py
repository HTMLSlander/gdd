from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.utils.timezone import now
from getdailydrink.models import UserWaterIntake

@receiver(post_save, sender=UserWaterIntake)
def send_email_to_drink(sender, instance, created, **kwargs):
    if created:
        user = instance.user
        if user:
            last_intake = UserWaterIntake.objects.filter(user=user).order_by('-timestamp').first()
            if last_intake:
                time_since_last_intake = (now() - last_intake.timestamp).total_seconds() / 3600  # Convert to minutes

                if time_since_last_intake >= 1:
                    send_mail(
                    "💧 Time to Drink Water!",
                    "Stay hydrated! It's time to drink water.",
                    'amineratit6@gmail.com',
                    [instance.user.email],
                    fail_silently=False,
                    )
                print("Email Sent!")