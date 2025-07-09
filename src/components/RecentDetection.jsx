import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import '../index.css';

export default function RecentDetections() {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'PeopleDetections'),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          location: d.location || 'Unknown',
          count: typeof d.count === 'number' ? d.count : d.count?.in_count ?? 0,
          time: d.timestamp?.toDate().toLocaleString() || 'N/A'
        };
      });
      setDetections(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="card detection-box">
      <h3 className="recent-title">Recent Detections</h3>
      <div className="table-scroll-wrapper">
        <table className="recent-table">
          <thead>
            <tr>
              <th>Location</th>
              <th>Count</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {detections.map((item) => (
              <tr key={item.id}>
                <td>{item.location}</td>
                <td>{item.count}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
