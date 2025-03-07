from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.utils.timezone import now
from getdailydrink.models import UserWaterIntake
from django.conf import settings


class Command(BaseCommand):

    def handle(self, *args, **kwargs):
        current_hour = now().hour

        userwater = UserWaterIntake.objects.all()

        for waterintake in userwater:
            user = waterintake.user

            if user and user.email:
                if current_hour % waterintake.email_frequency == 0:
                    send_mail(
                        '💧 Water Reminder!',
                        f'Hey {user.username}, it’s time to drink water! 💙',
                        settings.EMAIL_HOST_USER,
                        [user.email],
                        fail_silently=False,
                    )
        self.stdout.write(self.style.SUCCESS("✅ Water reminder emails sent!"))
