from django.apps import AppConfig


class GetdailydrinkConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'getdailydrink'
    
    def ready(self):
        import getdailydrink.signals