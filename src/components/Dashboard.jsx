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
// import React from "react";
// import PeopleChart from "../components/Peoplecharts";
// import RecentDetections from "../components/RecentDetection";
// import "../index.css"; // Ensure this path is correct

// export default function Dashboard() {
//   return (
//     <div className="dashboard-container">
//       <h1 className="dashboard-header">Admin Dashboard</h1>
//       <PeopleChart />
//       <RecentDetections />
//       {/* Add <HeatmapDashboard /> here later if needed */}
//     </div>
//   );
// }
import StatsCard from "../components/StatsCard";
import PeopleChart from "../components/Peoplecharts";
import RecentDetections from "../components/RecentDetection";
import ZonePieChart from "../components/ZonePieChart";
import CameraLiveCard from "../components/CameraLiveCard";

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <StatsCard />

      <div className="grid grid-cols-2 gap-4 mt-4">
        <PeopleChart />
        <CameraLiveCard />
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <ZonePieChart />
        <RecentDetections />
      </div>
    </div>
  );
}
