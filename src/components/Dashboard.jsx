import React from "react";
import PeopleChart from "../components/Peoplecharts";
import RecentDetections from "../components/RecentDetection";

export default function Dashboard() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Admin Dashboard</h1>
      <PeopleChart />
      <RecentDetections />
      {/* Add <HeatmapDashboard /> here later if needed */}
    </div>
  );
}
