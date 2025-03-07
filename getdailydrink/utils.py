import pandas as pd

def load_hydration_data(file_path="hydration_data.csv"):
    """Loads hydration dataset and preprocesses categorical values."""
    df = pd.read_csv(file_path)


    # Encode categorical features

    df['gender'] = df['gender'].map({'male': 0, 'female': 1})
    df['climate'] = df['climate'].map({
        'cold' : 1,
        'temperate' : 1.05,
        'hot' : 1.1, 
        })
    df['activity_level'] = df['activity_level'].map({
        'sedentary': 1.0,
        'lightly-active': 1.1,
        'moderately-active': 1.2,
        'very-active': 1.3,
    })
    df['health_conditions'] = df['health_conditions'].map({
        'pregnancy': 1.2,    
        'diabetes': 1.3,   
        'kidney disease': 0.8,
        'heart disease': 0.9, 
        'none' : 1.0,
    })

    return df

if __name__ == "__main__":
    df = load_hydration_data()
    print(df.head())  # Show first 5 rows to verify
