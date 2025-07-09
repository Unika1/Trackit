import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import PeopleChart from "../components/Peoplecharts";
import RecentDetections from "../components/RecentDetection";
import ZonePieChart from "../components/ZonePieChart";
import CameraLiveCard from "../components/CameraLiveCard";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("");
  const [stats, setStats] = useState({
    totalToday: 0,
    activeUsers: 0,
    busiestHour: "N/A"
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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
          hourlyMap[hour] = (hourlyMap[hour] || 0) + validCount;
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
    <div className="dashboard-wrapper">
      {/* Header */}
      <div className="dashboard-header-row">
        <h1 className="dashboard-title">Trackit</h1>
        <div className="dashboard-time">
          <span>{new Date().toLocaleDateString()}</span>
          <span className="live-dot">● {currentTime}</span>
        </div>
      </div>

      {/* Top grid: Camera + Metrics */}
      <div className="dashboard-grid-top">
        <div className="card camera-container">
          <CameraLiveCard />
        </div>
        <div className="metrics-container">
          <StatsCard title="👥 Total Today" value={stats.totalToday} />
          <StatsCard title="🟢 Active Users (Last Hour)" value={stats.activeUsers} />
          <StatsCard title="⏰ Busiest Hour" value={stats.busiestHour} />
        </div>
      </div>

      {/* Bottom grid: PeopleChart + ZonePieChart + RecentDetections */}
      <div className="dashboard-grid-bottom">
        <div className="card chart-box">
          <PeopleChart />
        </div>
        <div className="card pie-box">
          <ZonePieChart />
        </div>
        <div className="card detection-box">
          <RecentDetections />
        </div>
      </div>
    </div>
  );
}
