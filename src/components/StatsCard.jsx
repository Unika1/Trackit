export default function StatsCard({ title, value }) {
  return (
    <div className="card">
      <p style={{ fontSize: '14px', color: '#666' }}>{title}</p>
      <h2 style={{ fontSize: '24px', fontWeight: 600 }}>{value}</h2>
    </div>
  );
}
