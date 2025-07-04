import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import PeopleChart from "../components/Peoplecharts";
import RecentDetections from "../components/RecentDetection";
import ZonePieChart from "../components/ZonePieChart";
import CameraLiveCard from "../components/CameraLiveCard";

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
  <div style={{ backgroundColor: "#f7f9fc", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px" }}>
      {/* Header */}
      <div style={{ marginBottom: "30px", textAlign: "center" }}>
        <h1 className="dashboard-header">Admin Dashboard</h1>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          alignItems: "center",
          color: "#666",
          fontSize: "14px",
        }}>
          <span>{new Date().toLocaleDateString()}</span>
          <span style={{ color: "green", fontWeight: 500 }}>● Live</span>
          <span>{currentTime}</span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="metrics">
        <StatsCard />
      </div>

      {/* Camera Live Feed */}
      <div className="card" style={{ marginBottom: "30px" }}>
        <CameraLiveCard />
      </div>

      {/* People Count Chart */}
      <div className="card" style={{ marginBottom: "30px" }}>
        <PeopleChart />
      </div>

      {/* Bottom Row: Pie + Recent Detections */}
      <div className="dashboard-row" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div className="card" style={{ flex: 1 }}>
          <ZonePieChart />
        </div>
        <div className="card" style={{ flex: 2 }}>
          <RecentDetections />
        </div>
      </div>
    </div>
  </div>
);
}
