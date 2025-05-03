import pandas as pd
import numpy as np
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# ✅ Load dataset with proper column names
column_names = ['gender', 'age', 'weight', 'climate', 'health_conditions', 'activity_level', 'base_water']
df = pd.read_csv('hydration_data.csv', header=0, names=column_names)

# Print the first few rows to verify
print("Original DataFrame:")
print(df.head())

# ✅ Fill missing base_water values with a hydration formula
# Basic formula: weight in kg * 0.033 liters with adjustments for climate, activity, etc.
def calculate_hydration(row):
    # Convert weight to kg if it's in pounds
    weight_kg = row['weight'] * 0.453592 if row['weight'] > 100 else row['weight']
    
    # Base calculation: 33ml per kg of body weight
    base = weight_kg * 33  # in milliliters
    
    # Adjustments for factors
    # Climate: increase for hotter climates
    climate_factor = 1.0
    if row['climate'] == 'temperate':
        climate_factor = 1.1
    elif row['climate'] == 'hot':
        climate_factor = 1.2
    
    # Activity level: increase for more active individuals
    activity_factor = 1.0
    if row['activity_level'] == 'lightly-active':
        activity_factor = 1.1
    elif row['activity_level'] == 'moderately-active':
        activity_factor = 1.2
    elif row['activity_level'] == 'very-active':
        activity_factor = 1.3
    
    # Age: younger people generally need more water per kg
    age_factor = 1.0
    if row['age'] < 30:
        age_factor = 1.05
    elif row['age'] > 55:
        age_factor = 0.95
    
    # Health conditions: some require more water
    health_factor = 1.0
    if row['health_conditions'] != 'none':
        health_factor = 1.1
    
    # Gender: slight adjustment
    gender_factor = 1.0 if row['gender'] == 'male' else 0.95
    
    # Calculate final daily water requirement in ml, convert to liters, then add random variation
    water_ml = base * climate_factor * activity_factor * age_factor * health_factor * gender_factor
    water_liters = water_ml / 1000  # Convert to liters
    
    # Add small random variation (±10%)
    water_liters = water_liters * (0.9 + np.random.random() * 0.2)
    
    return round(water_liters, 2)  # Round to 2 decimal places

# Fill NaN values in base_water column
mask = df['base_water'].isna()
df.loc[mask, 'base_water'] = df[mask].apply(calculate_hydration, axis=1)

print("DataFrame with filled values:")
print(df.head())

# ✅ Convert categorical data to numerical values
df['gender'] = df['gender'].map({'male': 0, 'female': 1})
df['climate'] = df['climate'].map({'cold': 0, 'temperate': 1, 'hot': 2})
df['activity_level'] = df['activity_level'].map({
    'sedentary': 0,
    'lightly-active': 1,
    'moderately-active': 2,
    'very-active': 3
})
df['health_conditions'] = df['health_conditions'].map({
    'none': 0,
    'diabetes': 1,
    'kidney disease': 2,
    'heart disease': 3,
    'pregnancy': 4
})

# ✅ Define features and target variable
X = df[['weight', 'gender', 'age', 'climate', 'activity_level', 'health_conditions']]
y = df['base_water']

# ✅ Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ✅ Initialize the scaler and fit_transform on training data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ✅ Train the model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate model
train_score = model.score(X_train_scaled, y_train)
test_score = model.score(X_test_scaled, y_test)
print(f"Model R² score on training data: {train_score:.4f}")
print(f"Model R² score on test data: {test_score:.4f}")

# ✅ Save the trained model and scaler
joblib.dump(model, "hydration_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Hydration prediction model trained and saved!")