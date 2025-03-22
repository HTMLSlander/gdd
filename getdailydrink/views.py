from django.shortcuts import redirect, render, get_object_or_404
from django.http import JsonResponse
import pandas as pd
from accounts.models import Profile
from .forms import *
from .models import UserWaterIntake, SaveGoal, WaterTake
from django.contrib.auth.decorators import login_required
from django.utils.timezone import now
import numpy as np
from django.contrib import messages
from django.http import HttpResponse
import joblib
from datetime import timedelta
from django.core.mail import send_mail
from django.utils.timezone import localtime
# Import the calculation function from utils.py
from .utils import calculate_water_intake

model = joblib.load('hydration_model.pkl')


def email_save(request):
    if request.method == 'POST':
        form = EmailSupport(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'We will give you the last new of App.')
        else:
            print(form.errors)
    else:
        form = EmailSupport()
    return redirect('home')

def home(request):

    """ Displays reward leaderboard based on points earned. """
    user = request.user
    if not request.session.session_key:
        request.session.create()

    # Show rewards to all users
    rewards = SaveGoal.objects.all().order_by('-points')
    winners = SaveGoal.objects.all().order_by('-points')[0:3]
    context = {
        'rewards': rewards,
        'winners' : winners,

        'water' : 0
    }
    if request.user.is_authenticated:
        dailygoal = UserWaterIntake.objects.filter(user=user).last()
    else:
        dailygoal = UserWaterIntake.objects.filter(session_key=request.session.session_key).last()
    if dailygoal:
        context.update({
            'dailygoal' : dailygoal,
            'water': round(dailygoal.water_amount, 2),
        })
    if request.user.is_authenticated:
        return redirect('rankup')
    
    return render(request, 'pages/home.html', context)


def rankup_page(request):
    """ Home page: All users can see rewards and rankings """
    
    if not request.session.session_key:
        request.session.create()
        
    rewards = SaveGoal.objects.all().order_by('-points')
    winners = SaveGoal.objects.all().order_by('-points')[0:3]

    user = request.user if request.user.is_authenticated else None
    session_key = request.session.session_key

    # Fetch user's last daily goal
    if user:
        dailygoal = UserWaterIntake.objects.filter(user=user).last()
        # Get today's water intake
        today_intake = WaterTake.objects.filter(
            user=user, 
            created_at__date=now().date()
        )
        today_total = sum(entry.amount_liters for entry in today_intake)

        # Get this week's water intake
        week_intake = WaterTake.objects.filter(
            user=user,
            created_at__date__gte=now().date() - timedelta(days=7)
        )
        week_total = sum(entry.amount_liters for entry in week_intake)

        # Get this month's water intake
        month_intake = WaterTake.objects.filter(
            user=user,
            created_at__date__gte=now().date() - timedelta(days=30)
        )
        month_total = sum(entry.amount_liters for entry in month_intake)

        # Calculate weekly and monthly goals
        weekly_goal = dailygoal.water_amount * 7 if dailygoal else 0
        monthly_goal = dailygoal.water_amount * 30 if dailygoal else 0
        
        recap_data = {
            'today_total': round(today_total, 1),
            'today_goal': round(dailygoal.water_amount if dailygoal else 0, 1),
            'week_total': round(week_total, 1),
            'week_goal': round(weekly_goal, 1),
            'month_total': round(month_total, 1),
            'month_goal': round(monthly_goal, 1),
        }
    else:
        dailygoal = UserWaterIntake.objects.filter(session_key=session_key).last()
        recap_data = None
    
    if not dailygoal:
        return redirect('log_water')

    # For non-authenticated users, show rewards and rankings but hide water logging
    if not request.user.is_authenticated:
        context = {
            'winners': winners,
            'dailygoal' : dailygoal,
            'rewards': rewards,
            'water': round(dailygoal.water_amount, 2),
            'recap_data': recap_data
        }
        return render(request, 'pages/rankup.html', context)

    # Fetch logged-in user's water intake
    water_intake = WaterTake.objects.filter(user=user, created_at__date=now().date())
    total_intake = sum(entry.amount_liters for entry in water_intake)

    if request.method == 'POST':
        form = GoalWaterForm(request.POST)
        if form.is_valid():
            cup_sizes = {"250ml": 0.25, "500ml": 0.5, "1L": 1.0}
            cup = form.cleaned_data['cup']
            amount_liters = cup_sizes.get(cup, 0)

            if amount_liters == 0:
                messages.error(request, "Invalid cup size.")
                return redirect('rankup')

            # Save water intake
            WaterTake.objects.create(user=user, cup=cup, amount_liters=amount_liters)
            total_intake += amount_liters

            # Get or create SaveGoal
            savegoal, _ = SaveGoal.objects.get_or_create(
                user=user, 
                defaults={"water_intake": dailygoal}
            )
            
            # Check if goal is complete
            if total_intake >= dailygoal.water_amount:
                savegoal.complete = True
                savegoal.points += 5
                savegoal.water_intake = dailygoal
                savegoal.save()

                messages.success(request, f"Goal completed! 🎉 You earned {savegoal.points} points.", extra_tags="rankup")

                WaterTake.objects.filter(user=request.user, created_at__date=now().date()).delete()
                total_intake = 0

                return redirect('rankup')

    else:
        form = GoalWaterForm()

    water_left = max(dailygoal.water_amount - total_intake, 0)
    week_left = max(weekly_goal - total_intake, 0)
    month_left = max(monthly_goal - total_intake, 0)

    context = {
        'form': form, 
        'winners' : winners,
        'rewards': rewards,
        'water': round(dailygoal.water_amount, 2),
        'water_left': round(water_left, 2),
        'week_left' : round(week_left, 2),
        'month_left' : round(month_left, 2),
        'recap_data': recap_data,
    }
    return render(request, 'pages/rankup.html', context)


def log_water(request):
    """Logs user's water intake goal based on enhanced precision calculation."""
    
    # Load the trained model (ensure it's available)
    try:
        model = joblib.load('hydration_model.pkl')
        scaler = joblib.load('scaler.pkl')
    except FileNotFoundError as e:
        print(f"File not found: {e}")
        return render(request, 'error_page.html', {'message': f'Required file not found: {e}'})

    profile = None

    if request.user.is_authenticated:
        try:
            profile = request.user.profile
        except Profile.DoesNotExist:
            profile = None
    
    if request.method == 'POST':
        form = WaterIntakeForm(request.POST)
        if form.is_valid():
            try:
                # Extract profile data
                if profile:
                    weight = profile.weight
                    gender = profile.gender 
                    age = profile.age
                else:
                    weight = form.cleaned_data['weight']
                    gender = form.cleaned_data['gender']
                    age = form.cleaned_data['age']

                # Extract form data
                climate = form.cleaned_data['climate']  
                activity_level = form.cleaned_data['activity_level']
                health_conditions = form.cleaned_data['health_conditions']  

                # Get precise water intake calculation
                # 1. Base calculation using the high-precision formula from utils.py
                formula_water = calculate_water_intake(
                    gender=gender,
                    weight=weight,
                    age=age,
                    activity_level=activity_level,
                    climate=climate,
                    health_condition=health_conditions
                )
                
                # 2. Get additional precision factors that might not be in the formula
                # Age adjustment - younger adults need slightly more water
                age_factor = 1.0
                if age < 30:
                    age_factor = 1.05
                elif age > 55:
                    age_factor = 0.95
                
                # Gender-specific adjustments based on physiological differences
                gender_factor = 1.0 if gender == 'male' else 0.9
                
                # 3. Apply enhanced precision calculation
                precise_water = formula_water * age_factor * gender_factor
                
                # 4. Round to meaningful precision (nearest 50ml)
                # This makes the recommendation feel more intentional
                precise_water = round(precise_water * 20) / 20
                
                # 5. Ensure the value is within realistic boundaries
                min_water = 1.5  # Minimum healthy intake for adults
                max_water = 5.0  # Maximum reasonable intake
                final_water = max(min(precise_water, max_water), min_water)
                
                # Print debug info
                print(f"Base formula: {formula_water}, Age factor: {age_factor}, Gender factor: {gender_factor}")
                print(f"Final precise recommendation: {final_water} liters")

                # Save new data entry into CSV
                new_entry = pd.DataFrame([{
                    'gender': gender,
                    'age': age,
                    'weight': weight,
                    'climate': climate, 
                    'health_conditions': health_conditions,  
                    'activity_level': activity_level, 
                }])
                new_entry.to_csv('hydration_data.csv', mode='a', header=False, index=False)

                # Ensure session is created
                if not request.session.session_key:
                    request.session.create()

                # Save the prediction to the database
                if request.user.is_authenticated:
                    UserWaterIntake.objects.create(
                        user=request.user,
                        water_amount=final_water,
                        email_frequency=form.cleaned_data['email_frequency'],
                        reminder_times=[f"{int(hour):02d}:00" for hour in form.cleaned_data['reminder_times']],
                    )
                else:
                    UserWaterIntake.objects.create(
                        session_key=request.session.session_key,
                        water_amount=final_water,
                    )

                return redirect('rankup')
            except Exception as e:
                import traceback
                traceback.print_exc()
                messages.error(request, f"Error processing your request: {str(e)}")
        else:
            messages.error(request, "Please correct the errors in the form.", extra_tags='log_water')
            print("Form Errors:", form.errors)
    else:
        form = WaterIntakeForm()

    return render(request, 'pages/log_water.html', {'form': form})

def user_profile(request):
    dailygoal = UserWaterIntake.objects.filter(user=request.user).last()
    
    water_amount = 0
    if dailygoal:
        if dailygoal.water_amount is not None:
            water_amount = round(dailygoal.water_amount, 2)
            
    user_profile = get_object_or_404(Profile, user=request.user)
    if request.method == 'POST':
        update_form = ProfileForm(request.POST, request.FILES, instance=user_profile)
        if update_form.is_valid():
            update_form.save()
    
    else:
        update_form = ProfileForm(instance=user_profile)
    return render(request, 'pages/profile.html', {'dailygoal' : water_amount, 'update_form' : update_form})