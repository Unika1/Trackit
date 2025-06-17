import PeopleChart from "../src/components/Peoplecharts.jsx";
import HeatmapDashboard from "../src/components/HeatmapDashboard.jsx";
import RecentDetections from "../src/components/RecentDetection.jsx";

export default function App() {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Admin Dashboard</h1>
      <PeopleChart />
      <HeatmapDashboard />
      <RecentDetections />
    </div>
  );
}
