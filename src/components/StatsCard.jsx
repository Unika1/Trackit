import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function StatsCard() {
  const [stats, setStats] = useState({
    totalToday: 0,
    activeUsers: 0,
    busiestHour: "N/A"
  });

  useEffect(() => {
    async function fetchStats() {
      const snapshot = await getDocs(collection(db, "PeopleDetections"));
      const now = new Date();
      const today = now.toDateString();
      let total = 0;
      let hourlyMap = {};
      let active = 0;

      snapshot.forEach(doc => {
        const { count, timestamp } = doc.data();
        const ts = timestamp?.toDate();
        if (!ts) return;
        const validCount = Number(count) || 0;

        if (ts.toDateString() === today) {
          total += validCount;
          const hour = ts.getHours();
          hourlyMap[hour] = (hourlyMap[hour] || 0) + count;
          if ((now - ts) / 1000 < 3600) {
            active += validCount;
          }
        }
      });

      const busiestHour = Object.entries(hourlyMap).sort((a, b) => b[1] - a[1])[0]?.[0];

      setStats({
        totalToday: total,
        activeUsers: active,
        busiestHour: busiestHour ? `${busiestHour}:00 - ${Number(busiestHour) + 1}:00` : "N/A"
      });
    }

    fetchStats();
  }, []);

  return (
    <div className="metrics">
      <div className="card">
        <p style={{ color: "#666", fontSize: "14px" }}>👥 Total Today</p>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "8px" }}>{stats.totalToday}</h2>
      </div>

      <div className="card">
        <p style={{ color: "#666", fontSize: "14px" }}>🟢 Active Users (Last Hour)</p>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "8px" }}>{stats.activeUsers}</h2>
      </div>

      <div className="card">
        <p style={{ color: "#666", fontSize: "14px" }}>⏰ Busiest Hour</p>
        <h2 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "8px" }}>{stats.busiestHour}</h2>
      </div>
    </div>
  );
}
