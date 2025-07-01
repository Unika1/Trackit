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
    <div
      style={{
        backgroundColor: "#f7f9fc",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Optional Wrapper to center the content */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "30px" }}>
        {/* Header */}
        <div style={{ marginBottom: "30px", textAlign: "center" }}>
          <h1 className="dashboard-header">Admin Dashboard</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              alignItems: "center",
              color: "#666",
              fontSize: "14px",
            }}
          >
            <span>{new Date().toLocaleDateString()}</span>
            <span style={{ color: "green", fontWeight: 500 }}>● Live</span>
            <span>{currentTime}</span>
          </div>
        </div>

        {/* StatsCard left, CameraLiveCard (square) + PeopleChart right */}
        <div
          className="dashboard-row"
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "flex-start",
            marginBottom: "30px",
          }}
        >
          {/* Left: StatsCard only */}
          <div style={{ flex: 1, maxWidth: "300px" }}>
            <StatsCard />
          </div>

          {/* Right: CameraLiveCard (square) + PeopleChart stacked below */}
          <div
            style={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Square camera box */}
            <div
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                overflow: "hidden",
              }}
            >
              <CameraLiveCard />
            </div>

            {/* People chart below camera */}
            <div className="card">
              <PeopleChart />
            </div>
          </div>
        </div>

        {/* Zone Pie & Recent Table */}
        <div
          className="dashboard-row"
          style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
        >
          <div className="card" style={{ flex: 1 }}>
            <ZonePieChart />
          </div>
          <div className="card" style={{ flex: 1 }}>
            <RecentDetections />
          </div>
        </div>
      </div>
    </div>
  );
}
