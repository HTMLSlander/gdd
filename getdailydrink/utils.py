import pandas as pd

# Function to load and preprocess hydration data
def load_hydration_data(file_path="hydration_data.csv"):
    """Loads hydration dataset and encodes categorical values."""
    df = pd.read_csv(file_path)

    # Encode categorical features
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

    return df

# Function to calculate recommended daily water intake
def calculate_water_intake(weight, activity_level, climate, health_condition):
    """Calculates precise water intake based on multiple factors."""
    base_water = weight * 0.033  # Base water intake in liters (33mL per kg)

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
        'none': 1.0, 'pregnancy': 1.2, 'diabetes': 1.3, 'kidney disease': 0.8, 'heart disease': 0.9
    }
    base_water *= health_multiplier.get(health_condition, 1.0)

    return round(base_water, 2)  # Return result rounded to 2 decimal places

if __name__ == "__main__":
    # Load dataset (optional, for future ML integration)
    df = load_hydration_data()
    
    # Example user input
    weight = 70  # in kg
    activity_level = 'moderately-active'
    climate = 'hot'
    health_condition = 'none'

    # Calculate and display recommended water intake
    water_needed = calculate_water_intake(weight, activity_level, climate, health_condition)
    print(f"Recommended daily water intake: {water_needed} liters")
