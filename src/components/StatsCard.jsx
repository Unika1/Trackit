import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs, Timestamp } from "firebase/firestore";

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

        if (ts.toDateString() === today) {
          total += count;
          const hour = ts.getHours();
          hourlyMap[hour] = (hourlyMap[hour] || 0) + count;
          if ((now - ts) / 1000 < 3600) {
            active += count;
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
    <div className="grid grid-cols-3 gap-4 mt-4">
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">Total Today</p>
        <h2 className="text-2xl font-bold">{stats.totalToday}</h2>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">Active Users</p>
        <h2 className="text-2xl font-bold">{stats.activeUsers}</h2>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <p className="text-gray-500">Busiest Hour</p>
        <h2 className="text-2xl font-bold">{stats.busiestHour}</h2>
      </div>
    </div>
  );
}
