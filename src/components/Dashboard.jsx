// import React from "react";
// import PeopleChart from "../components/Peoplecharts";
// import RecentDetections from "../components/RecentDetection";
// import "../index.css"; 

// export default function Dashboard() {
//   return (
//     <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
//       <h1>Admin Dashboard</h1>
//       <PeopleChart />
//       <RecentDetections />
//       {/* Add <HeatmapDashboard /> here later if needed */}
//     </div>
//   );
// }
import React from "react";
import PeopleChart from "../components/Peoplecharts";
import RecentDetections from "../components/RecentDetection";
import "../index.css"; // Ensure this path is correct

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header">Admin Dashboard</h1>
      <PeopleChart />
      <RecentDetections />
      {/* Add <HeatmapDashboard /> here later if needed */}
    </div>
  );
}
