import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hydration_reminder.settings')

app = Celery('hydration_reminder')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.worker_pool = 'solo'

# Add beat schedule
app.conf.beat_schedule = {
    'send-hydration-reminders-every-minute': {
        'task': 'getdailydrink.tasks.send_hydration_reminders',
        'schedule': crontab(minute='*/60'),  # Run every minute for testing
    },
}

app.autodiscover_tasks()