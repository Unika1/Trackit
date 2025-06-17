import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function RecentDetections() {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snapshot = await getDocs(collection(db, "detections"));
      const entries = [];
      snapshot.forEach(doc => {
        entries.push(doc.data());
      });
      setDetections(entries.sort((a, b) => b.timestamp - a.timestamp));
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h3>Recent Detections</h3>
      <ul>
        {detections.slice(0, 5).map((d, idx) => (
          <li key={idx}>
            {new Date(d.timestamp).toLocaleString()} - {d.count} people in {d.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
