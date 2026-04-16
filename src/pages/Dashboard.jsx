function Dashboard() {
  const spots = [
    { id: "A1", occupied: true },
    { id: "A2", occupied: false },
    { id: "A3", occupied: true },
    { id: "A4", occupied: false },
    { id: "B1", occupied: false },
    { id: "B2", occupied: true },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginTop: 0 }}>Parking Dashboard</h1>
      <p>Live parking status preview</p>

      <div style={{ display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
        {spots.map((spot) => (
          <div
            key={spot.id}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "12px",
              backgroundColor: spot.occupied ? "#ef4444" : "#22c55e",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            {spot.id}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
