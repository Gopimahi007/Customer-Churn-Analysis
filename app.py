# app.py

from flask import Flask, jsonify, render_template
import pandas as pd

# Initialize the Flask app
app = Flask(__name__)

# --- Data Processing Function ---
def process_data():
    # Load the dataset
    df = pd.read_csv('data/WA_Fn-UseC_-Telco-Customer-Churn.csv')

    # Quick cleaning
    df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
    df.dropna(inplace=True)
    df['ChurnValue'] = df['Churn'].apply(lambda x: 1 if x == 'Yes' else 0)

    # --- Prepare data for charts ---
    
    # 1. Overall Churn Rate (for a donut chart)
    churn_counts = df['Churn'].value_counts()
    churn_data = {
        'labels': churn_counts.index.tolist(),
        'values': churn_counts.values.tolist()
    }

    # 2. Churn by Contract Type (for a bar chart)
    contract_churn = df.groupby('Contract')['ChurnValue'].value_counts().unstack().fillna(0)
    contract_data = {
        'labels': contract_churn.index.tolist(),
        'churned': contract_churn[1].values.tolist(),
        'retained': contract_churn[0].values.tolist()
    }
    
    # 3. Churn by Tech Support (for a bar chart)
    tech_support_churn = df.groupby('TechSupport')['ChurnValue'].value_counts().unstack().fillna(0)
    tech_support_data = {
        'labels': tech_support_churn.index.tolist(),
        'churned': tech_support_churn[1].values.tolist(),
        'retained': tech_support_churn[0].values.tolist()
    }

    # Combine all data into a single dictionary
    processed_data = {
        'churn_rate': churn_data,
        'by_contract': contract_data,
        'by_tech_support': tech_support_data
    }
    
    return processed_data

# --- API Route ---
# This route sends the processed data to our JavaScript frontend
@app.route('/api/data')
def get_data():
    data = process_data()
    return jsonify(data)

# --- HTML Page Route ---
# This route serves our main HTML page
@app.route('/')
def home():
    return render_template('index.html')

# Run the app
if __name__ == '__main__':
    app.run(debug=True) 