import React from "react";
import "../../src/index.css"; // Ensure you have the correct path to your CSS
import PeopleChart from "./Peoplecharts";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">👀 Human Detection Dashboard</h1>

      <div className="card">
        <h2>📊 People Tracking Over Time</h2>
        <div className="chart-container">
          <PeopleChart />
        </div>
      </div>

      {/* Add more cards for heatmaps, stats, etc */}
    </div>
  );
}
