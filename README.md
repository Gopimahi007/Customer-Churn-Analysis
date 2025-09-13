## Telco Customer Churn Dashboard

This project is a Flask-based web application that visualizes customer churn insights from the Telco Customer Churn dataset. It processes the data with pandas and serves it via an API, while the frontend (HTML + JavaScript) can render interactive charts such as donut and bar charts.

 ## Features

Customer Churn Overview: Donut chart showing overall churn vs. retention.

Churn by Contract Type: Bar chart comparing churn rates across different contract types.

Churn by Tech Support: Bar chart comparing churn based on whether customers had tech support.

REST API Endpoint: Data is exposed at /api/data in JSON format.

Frontend Dashboard: Access the dashboard at the root URL /.

 ## Tech Stack

Backend: Python, Flask

Data Processing: Pandas

Frontend: HTML, JavaScript (charts to be integrated e.g., Chart.js / Plotly)

Dataset: Telco Customer Churn Dataset
