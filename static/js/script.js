// static/js/script.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch data from our Flask API
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            // Once data is loaded, create the charts
            createChurnRateChart(data.churn_rate);
            createContractChart(data.by_contract);
            createTechSupportChart(data.by_tech_support);
        })
        .catch(error => console.error('Error fetching data:', error));
});

// --- Chart Creation Functions ---

function createChurnRateChart(data) {
    const ctx = document.getElementById('churnRateChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.labels,
            datasets: [{
                label: 'Churn Rate',
                data: data.values,
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}

function createContractChart(data) {
    const ctx = document.getElementById('contractChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Retained',
                    data: data.retained,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                },
                {
                    label: 'Churned',
                    data: data.churned,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true }
            }
        }
    });
}

function createTechSupportChart(data) {
    const ctx = document.getElementById('techSupportChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [
                {
                    label: 'Retained',
                    data: data.retained,
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                },
                {
                    label: 'Churned',
                    data: data.churned,
                    backgroundColor: 'rgba(255, 159, 64, 0.6)',
                }
            ]
        },
        options: {
            indexAxis: 'y', // Makes it a horizontal bar chart
            responsive: true,
            scales: {
                x: { beginAtZero: true },
            }
        }
    });
}