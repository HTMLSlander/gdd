import pandas as pd
import joblib
import numpy as np

# Function to load and preprocess hydration data
def load_hydration_data(file_path="hydration_data.csv"):
    """Loads hydration dataset and encodes categorical values using consistent multipliers."""
    df = pd.read_csv(file_path)

    # Encode categorical features - using the same multipliers as in the calculation function
    df['gender'] = df['gender'].map({'male': 0, 'female': 1})
    df['climate'] = df['climate'].map({'cold': 1.0, 'temperate': 1.05, 'hot': 1.1})
    df['activity_level'] = df['activity_level'].map({
        'sedentary': 1.0,
        'lightly-active': 1.1,
        'moderately-active': 1.2,
        'very-active': 1.3,
    })
    df['health_conditions'] = df['health_conditions'].map({
        'none': 1.0, 
        'pregnancy': 1.2,    
        'diabetes': 1.3,   
        'kidney disease': 0.8,
        'heart disease': 0.9, 
    })
    
    # Add interaction terms for consistency with the ML model
    df['climate_activity'] = df['climate'] * df['activity_level']
    df['health_weight'] = df['health_conditions'] * df['weight']
    df['climate_health'] = df['climate'] * df['health_conditions']

    return df

# Function to calculate recommended daily water intake
def calculate_water_intake(weight, age, gender, activity_level, climate, health_condition):
    """Calculates precise water intake based on multiple factors."""
    # Base water intake in liters (33mL per kg)
    base_water = weight * 0.033  
    
    # Gender adjustment (small effect according to feature importance)
    gender_multiplier = {'male': 1.0, 'female': 1.02}
    base_water *= gender_multiplier.get(gender, 1.0)
    
    # Age adjustment (minor effect according to feature importance)
    # Slight reduction for older adults
    if age > 65:
        base_water *= 0.95
    elif age < 18:
        base_water *= 1.05  # Slight increase for younger people
    
    # Adjust for activity level
    activity_multiplier = {
        'sedentary': 1.0,
        'lightly-active': 1.1,
        'moderately-active': 1.2,
        'very-active': 1.3
    }
    base_water *= activity_multiplier.get(activity_level, 1.0)

    # Adjust for climate
    climate_multiplier = {'cold': 1.0, 'temperate': 1.05, 'hot': 1.1}
    base_water *= climate_multiplier.get(climate, 1.0)

    # Adjust for health conditions
    health_multiplier = {
        'none': 1.0, 
        'pregnancy': 1.2, 
        'diabetes': 1.3, 
        'kidney disease': 0.8, 
        'heart disease': 0.9
    }
    base_water *= health_multiplier.get(health_condition, 1.0)

    return round(base_water, 2)  # Return result rounded to 2 decimal places

# New function to get prediction from ML model
def predict_water_intake(weight, age, gender, activity_level, climate, health_condition):
    """Uses the trained ML model to predict water intake."""
    try:
        # Load model data
        model_data = joblib.load("hydration_model.pkl")
        model = model_data['model']
        scaler = model_data['scaler']
        feature_names = model_data['feature_names']
        
        # Map categorical values to same numerical values used in training
        gender_val = 1 if gender == 'female' else 0
        climate_val = {'cold': 1.0, 'temperate': 1.05, 'hot': 1.1}.get(climate, 1.0)
        activity_val = {
            'sedentary': 1.0,
            'lightly-active': 1.1,
            'moderately-active': 1.2,
            'very-active': 1.3
        }.get(activity_level, 1.0)
        health_val = {
            'none': 1.0, 
            'pregnancy': 1.2, 
            'diabetes': 1.3, 
            'kidney disease': 0.8, 
            'heart disease': 0.9
        }.get(health_condition, 1.0)
        
        # Create interaction terms
        climate_activity = climate_val * activity_val
        health_weight = health_val * weight
        climate_health = climate_val * health_val
        
        # Create input features
        if 'climate_activity' in feature_names:
            # Full feature set with interaction terms
            features = np.array([[weight, gender_val, age, climate_val, activity_val, health_val,
                                climate_activity, health_weight, climate_health]])
        else:
            # Fallback to original features if interaction terms weren't used in training
            features = np.array([[weight, gender_val, age, climate_val, activity_val, health_val]])
        
        # Scale features
        features_scaled = scaler.transform(features)
        
        # Make prediction
        prediction = model.predict(features_scaled)[0]
        
        return round(prediction, 2)
    except Exception as e:
        print(f"Error using ML model: {e}")
        # Fall back to calculation method if model prediction fails
        return calculate_water_intake(weight, age, gender, activity_level, climate, health_condition)

# Function to get more precise hydration recommendation
def get_precise_hydration(weight, age, gender, activity_level, climate, health_condition):
    """Gets a more precise hydration recommendation by averaging ML and formula methods."""
    # Get prediction from ML model
    ml_prediction = predict_water_intake(weight, age, gender, activity_level, climate, health_condition)
    
    # Get calculation from formula
    formula_prediction = calculate_water_intake(weight, age, gender, activity_level, climate, health_condition)
    
    # Take weighted average (giving more weight to ML model based on its importance)
    final_prediction = (0.7 * ml_prediction) + (0.3 * formula_prediction)
    
    return round(final_prediction, 2)

if __name__ == "__main__":
    # Example user input
    weight = 70  # in kg
    age = 35
    gender = 'female'
    activity_level = 'moderately-active'
    climate = 'hot'
    health_condition = 'none'

    # Calculate using traditional formula
    water_formula = calculate_water_intake(weight, age, gender, activity_level, climate, health_condition)
    print(f"Formula-based water intake: {water_formula} liters")
    
    # Predict using ML model
    water_ml = predict_water_intake(weight, age, gender, activity_level, climate, health_condition)
    print(f"ML-based water intake: {water_ml} liters")
    
    # Get precise recommendation
    water_precise = get_precise_hydration(weight, age, gender, activity_level, climate, health_condition)
    print(f"Precise recommended daily water intake: {water_precise} liters")