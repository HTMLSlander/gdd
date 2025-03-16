from django.db import models
from django.contrib.auth import get_user_model



# Create your models here.

User= get_user_model()

class UserWaterIntake(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    session_key = models.CharField(max_length=500, blank=True, null=True)
    water_amount = models.FloatField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    email_frequency = models.IntegerField(choices=[
        (1, 'Every 1 hour'),
        (2, 'Every 2 hour'),
        (4, 'Every 4 hour'),
        (6, 'Every 6 hour'),
        (12, 'Every 12 hour'),
        (24, 'Every one day'),
    ])

    def weekly_drink(self):
        if self.water_amount is None:
            return 0
        return round(self.water_amount * 7, 2)
    
    def monthly_drink(self):
        if self.water_amount is None:
            return 0
        return round(self.water_amount * 30, 2)

class WaterTake(models.Model):
    WATER_CHOICES = [
        ('250ml', 0.25),
        ('500ml', 0.50),
        ('1L', 1.0),
    ]
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    cup = models.CharField(max_length=100, choices=[(c[0], c[0]) for c in WATER_CHOICES])
    amount_liters = models.FloatField()
    waterintake = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        self.amount_liters = dict(self.WATER_CHOICES)[self.cup]
        if not self.waterintake:
            self.waterintake = self.amount_liters
            
        super().save(*args, **kwargs)

class SaveGoal(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    water_intake = models.ForeignKey(UserWaterIntake, on_delete=models.CASCADE)
    complete = models.BooleanField(default=False)
    points = models.PositiveIntegerField(default=0)
    total_water_drink = models.FloatField(default=0)

    def total(self):
        # Get all water intake records for this user
        water_intakes = UserWaterIntake.objects.filter(user=self.user)
        # Sum up all water amounts
        total = sum(intake.water_amount or 0 for intake in water_intakes)
        self.total_water_drink = total
        return round(total, 2)

    def get_level(self):
        points = self.points
        if points < 20:
            return 0
        elif points < 40:
            return 1
        elif points < 60:
            return 2
        elif points < 80:
            return 3
        elif points >= 100:
            return 4
        

class Email(models.Model):
    email = models.EmailField()

    def __str__(self):
        return self.email