from django.contrib import admin
from .models import UserWaterIntake, WaterTake, SaveGoal

# Register your models here.

admin.site.register(UserWaterIntake)
admin.site.register(WaterTake)
admin.site.register(SaveGoal)