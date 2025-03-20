import os
from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hydration_reminder.settings')

app = Celery('hydration_reminder')

app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.worker_pool = 'solo'  

app.autodiscover_tasks()
