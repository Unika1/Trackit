import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function PeopleChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(db, "PeopleDetections"));
      const data = [];

      snapshot.forEach((doc) => {
        const d = doc.data();

        let time = null;
        try {
          time = d.timestamp?.toDate();
        } catch {
          console.warn("⚠️ Invalid timestamp", d.timestamp);
        }

        const count = Number(d.count) || 0;

        if (time) {
          data.push({ x: time, y: count });
        }
      });

      if (data.length === 0) {
        console.warn("⚠️ No valid data found to display in chart.");
      }

      setChartData({
        datasets: [
          {
            label: "People Count Over Time",
            data: data.sort((a, b) => a.x - b.x),
            borderColor: "blue",
            backgroundColor: "lightblue",
            tension: 0.3,
            fill: false,
          },
        ],
      });
    }

    fetchData();
  }, []);

  if (!chartData) return <p className="chart-loading">Loading graph...</p>;

  return (
    <div className="card chart-box">
      <p className="chart-title">People Count Over Time</p>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
          },
          scales: {
            x: {
              type: "time",
              time: { unit: "hour" },
              title: { display: true, text: "Time" },
            },
            y: {
              title: { display: true, text: "Count" },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}
