import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# ✅ Load dataset
df = pd.read_csv('hydration_data.csv')

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

# ✅ Initialize the scaler and fit_transform on training data, then transform the test data
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)  # Fit and transform on training data
X_test_scaled = scaler.transform(X_test)  # Only transform on test data

# ✅ Train the model
model = RandomForestRegressor()
model.fit(X_train_scaled, y_train)

# ✅ Save the trained model and scaler
joblib.dump(model, "hydration_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Hydration prediction model trained and saved!")
