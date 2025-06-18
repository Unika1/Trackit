// import React, { useEffect, useState } from "react";
// import { db } from "../firebase/firebaseConfig";
// import { collection, getDocs } from "firebase/firestore";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
// import 'chartjs-adapter-date-fns';

// ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

// export default function PeopleChart() {
//   const [chartData, setChartData] = useState(null);

// useEffect(() => {
//   async function fetchData() {
//     const snapshot = await getDocs(collection(db, "PeopleDetections")); // 🔁 CHECK collection name here
//     const data = [];

//     snapshot.forEach((doc) => {
//       const d = doc.data();
//       console.log("DOC DATA:", d);

//       let time = null;
//       try {
//         time = d.timestamp.toDate();
//       } catch (err) {
//         console.warn("⚠️ Invalid timestamp", d.timestamp);
//       }

//       if (time && typeof d.count === "number") {
//         data.push({ x: time, y: d.count });
//       }
//     });

//     if (data.length === 0) {
//       console.warn("⚠️ No valid data found to display in chart.");
//     }

//     setChartData({
//       datasets: [
//         {
//           label: "People Count Over Time",
//           data: data.sort((a, b) => a.x - b.x),
//           borderColor: "blue",
//           fill: false,
//         },
//       ],
//     });
//   }

//   fetchData();
// }, []);


//   if (!chartData) return <p>Loading graph...</p>;

//   return (
//     <div style={{ maxWidth: 700, margin: "auto" }}>
//       <Line data={chartData} options={{
//         responsive: true,
//         scales: {
//           x: { type: "time", title: { display: true, text: "Time" } },
//           y: { title: { display: true, text: "Count" } }
//         }
//       }} />
//     </div>
//   );
// }
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
import "../index.css"; // Ensure this path is correct

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
          time = d.timestamp.toDate();
        } catch (err) {
          console.warn("⚠️ Invalid timestamp", d.timestamp);
        }

        if (time && typeof d.count === "number") {
          data.push({ x: time, y: d.count });
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
            fill: false,
          },
        ],
      });
    }

    fetchData();
  }, []);

  if (!chartData) return <p>Loading graph...</p>;

  return (
    <div className="card chart-container">
      <Line
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: { type: "time", title: { display: true, text: "Time" } },
            y: { title: { display: true, text: "Count" } }
          }
        }}
      />
    </div>
  );
}
