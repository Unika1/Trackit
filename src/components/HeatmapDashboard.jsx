import React, { useEffect, useRef } from "react";
import h337 from "heatmap.js";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function HeatmapDashboard() {
  const heatmapContainerRef = useRef(null);

  useEffect(() => {
    async function loadHeatmapData() {
      const snapshot = await getDocs(collection(db, "detections"));
      const heatmapPoints = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.x !== undefined && data.y !== undefined && data.count !== undefined) {
          heatmapPoints.push({
            x: data.x,
            y: data.y,
            value: data.count
          });
        }
      });

      const heatmapInstance = h337.create({
        container: heatmapContainerRef.current,
        radius: 40,
        maxOpacity: 0.6,
        minOpacity: 0.1,
        blur: 0.75
      });

      heatmapInstance.setData({
        max: 10, // Adjust based on your expected max count
        data: heatmapPoints
      });
    }

    loadHeatmapData();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Heatmap View</h2>
      <div
        ref={heatmapContainerRef}
        style={{
          width: "800px",
          height: "500px",
          margin: "20px auto",
          border: "1px solid #ccc",
          position: "relative"
        }}
      />
    </div>
  );
}
