import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PeopleChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(db, "detections"));
      const data = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        data.push({ x: d.timestamp, y: d.count });
      });

      setChartData({
        datasets: [{
          label: "People Count Over Time",
          data: data.sort((a, b) => a.x - b.x),
          borderColor: "blue",
          fill: false
        }]
      });
    }

    fetchData();
  }, []);

  if (!chartData) return <p>Loading graph...</p>;

  return (
    <div style={{ maxWidth: 700, margin: "auto" }}>
      <Line data={chartData} options={{
        responsive: true,
        scales: {
          x: { type: "time", title: { display: true, text: "Time" } },
          y: { title: { display: true, text: "Count" } }
        }
      }} />
    </div>
  );
}
