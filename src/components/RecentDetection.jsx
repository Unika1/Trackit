// import { useEffect, useState } from 'react';
// import { db } from '../firebase/firebaseConfig'; // Make sure this path is correct
// import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';

// export default function RecentDetections() {
//   const [detections, setDetections] = useState([]);

//   useEffect(() => {
//     const q = query(
//       collection(db, 'PeopleDetections'), // change to your actual collection name
//       orderBy('timestamp', 'desc'),
//       limit(5)
//     );

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const data = snapshot.docs.map(doc => {
//         const d = doc.data();
//         return {
//           id: doc.id,
//           location: d.location || 'Unknown',
//           count: d.count || 0,
//           time: d.timestamp?.toDate().toLocaleString() || 'N/A'
//         };
//       });
//       setDetections(data);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <div style={{ marginTop: '40px', padding: '0 20px' }}>
//       <h3 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Recent Detections</h3>
//       <table style={{
//         width: '100%',
//         borderCollapse: 'collapse',
//         fontFamily: 'Arial',
//         fontSize: '16px'
//       }}>
//         <thead>
//           <tr>
//             <th style={{ borderBottom: '2px solid #ccc', textAlign: 'left', padding: '10px' }}>Location</th>
//             <th style={{ borderBottom: '2px solid #ccc', textAlign: 'left', padding: '10px' }}>Count</th>
//             <th style={{ borderBottom: '2px solid #ccc', textAlign: 'left', padding: '10px' }}>Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {detections.map((item) => (
//             <tr key={item.id}>
//               <td style={{ padding: '8px 10px' }}>{item.location}</td>
//               <td style={{ padding: '8px 10px' }}>{item.count}</td>
//               <td style={{ padding: '8px 10px' }}>{item.time}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import '../index.css'; // Ensure this path is correct

export default function RecentDetections() {
  const [detections, setDetections] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'PeopleDetections'),
      orderBy('timestamp', 'desc'),
      limit(5)
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
    <div className="card" style={{ marginTop: '40px' }}>
      <h3 style={{ fontWeight: 'bold', marginBottom: '20px' }}>Recent Detections</h3>
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
  );
}
