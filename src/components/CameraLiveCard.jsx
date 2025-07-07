export default function CameraLiveCard() {
  return (
    <div style={{
  background: "#fff",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
  textAlign: "center",
}}>
  <p style={{ marginBottom: "10px", color: "#666" }}>Live Camera</p>
  <div style={{
    aspectRatio: "16 / 9",
    backgroundColor: "#e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#666",
  }}>
     <img
          src="http://192.168.137.60:5000/"
          alt="Live Stream"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
  </div>
</div>
);
}
