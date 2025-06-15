import { useEffect, useState } from 'react';
import './App.css';
import Chart from 'chart.js/auto';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/mock_data.json')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

 useEffect(() => {
  let chartInstance = null;

  if (data) {
    const ctx = document.getElementById('zoneChart');

    // Destroy the chart if it already exists on that canvas
    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Emergency', 'Pharmacy', 'Waiting Lounge'],
        datasets: [{
          label: 'People Count',
          data: [data.Emergency, data.Pharmacy, data['Waiting Lounge']],
          backgroundColor: ['#e74c3c', '#27ae60', '#f1c40f']
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }

  // Optional cleanup (especially useful if you want to update data live later)
  return () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };
}, [data]);


  return (
    <div className="App">
      <h1>Trackit – Hospital Dashboard</h1>
      {!data ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="metrics">
            <div className="card">Total Footfall: {data['Total Footfall']}</div>
            <div className="card">Peak Zone: {data['Peak Zone']}</div>
            <div className="card">Busiest Hour: {data['Busiest Hour']}</div>
          </div>
          <div className="chart-container">
            <canvas id="zoneChart"></canvas>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
