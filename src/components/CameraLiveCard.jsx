export default function CameraLiveCard() {
  const cameraUrl = "http://192.168.137.60:5000/";

  return (
    <div style={{
      background: "#fff",
      padding: "20px",
      borderRadius: "16px",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
      textAlign: "center",
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      <p style={{ marginBottom: "10px", color: "#666", fontWeight: "bold" }}>Live Camera</p>

      <div style={{
        flexGrow: 1,
        aspectRatio: "16 / 9",
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "18px",
        color: "#666",
      }}>
        <img
          src={cameraUrl}
          alt="Live Stream"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
            e.target.parentNode.innerHTML = "<p style='color: #666;'>Camera feed unavailable</p>";
          }}
        />
      </div>
    </div>
  );
}
