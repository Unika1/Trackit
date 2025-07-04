import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function ZonePieChart() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchZoneData() {
      const snapshot = await getDocs(collection(db, "PeopleDetections"));
      const locationMap = {};
      snapshot.forEach(doc => {
        const { location, count } = doc.data();
        locationMap[location] = (locationMap[location] || 0) + count;
      });

      const labels = Object.keys(locationMap);
      const values = Object.values(locationMap);

      setData({
        labels,
        datasets: [{
          data: values,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#77DD77'],
        }]
      });
    }

    fetchZoneData();
  }, []);

  if (!data) return <p>Loading zone usage...</p>;

  return (
  <div className="pie-wrapper bg-white p-4 rounded shadow">
    <p className="mb-2 text-gray-500 pie-chart-title">Zone Usage</p>
    <Pie
      data={data}
      options={{
        responsive: true,
        maintainAspectRatio: false
      }}
      width={180}
      height={180}
    />
  </div>
);
}
