export default function CameraLiveCard() {
  return (
    <div className="bg-white p-4 rounded shadow text-center">
      <p className="mb-2 text-gray-500"style={{ textAlign: "center" }}
      >Live Camera</p>
      <div className="aspect-video bg-gray-200 flex items-center justify-center">
        <p className="text-gray-700"style={{ textAlign: "center" }}
        >[Live Feed Placeholder]</p>
      </div>
    </div>
  );
}
