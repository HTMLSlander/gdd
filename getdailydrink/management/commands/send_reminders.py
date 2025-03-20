from django.core.management.base import BaseCommand
from getdailydrink.tasks import send_hydration_reminders

class Command(BaseCommand):
    help = "Manually send hydration reminders"

    def handle(self, *args, **kwargs):
        send_hydration_reminders.delay()
        self.stdout.write(self.style.SUCCESS('Successfully triggered hydration reminders'))
