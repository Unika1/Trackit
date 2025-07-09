import React from "react";

export default function StatsCard({ title, value }) {
  return (
    <div className="card metric-card">
      <p style={{ color: "#666", fontSize: "14px" }}>{title}</p>
      <h2 style={{ fontSize: "28px", fontWeight: "bold", marginTop: "8px" }}>{value}</h2>
    </div>
  );
}