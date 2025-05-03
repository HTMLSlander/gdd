web: gunicorn hydration_reminder.wsgi:application --bind 0.0.0.0:$PORT
worker: celery -A hydration_reminder worker --loglevel=info