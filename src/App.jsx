import { useState, useEffect } from "react";

function App() {
  const [page, setPage] = useState("dashboard");
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    fetchSpots();

    const interval = setInterval(fetchSpots, 5000); // refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  const fetchSpots = async () => {
    try {
      const res = await fetch(
        "https://cors-anywhere.herokuapp.com/https://chummy-starboard-avid.ngrok-free.dev/spots"
      );
      const data = await res.json();
      setSpots(data);
    } catch (err) {
      console.error("Error fetching spots:", err);
    }
  };

  const availableSpots = spots.filter((s) => s.status === "empty").length;
  const occupiedSpots = spots.filter((s) => s.status === "occupied").length;

  return (
    <div>
      <nav
        style={{
          backgroundColor: "#111827",
          color: "white",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>ADMAN Smart Parking</h2>

        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setPage("dashboard")} style={navButtonStyle}>
            Dashboard
          </button>
          <button onClick={() => setPage("about")} style={navButtonStyle}>
            About
          </button>
        </div>
      </nav>

      <div style={{ padding: "24px" }}>
        {page === "dashboard" && (
          <>
            <h1 style={{ marginTop: 0 }}>Parking Dashboard</h1>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "20px" }}>
              <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>Available Spots</h3>
                <p style={{ fontSize: "28px", margin: 0 }}>{availableSpots}</p>
              </div>

              <div style={cardStyle}>
                <h3 style={{ marginTop: 0 }}>Occupied Spots</h3>
                <p style={{ fontSize: "28px", margin: 0 }}>{occupiedSpots}</p>
              </div>
            </div>

            <h2 style={{ marginTop: "32px" }}>Parking Layout</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 100px)",
                gap: "16px",
                marginTop: "16px",
              }}
            >
              {spots.map((spot) => (
                <div
                  key={spot.label}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "12px",
                    backgroundColor:
                      spot.status === "occupied" ? "#ef4444" : "#22c55e",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  {spot.label}
                </div>
              ))}
            </div>
          </>
        )}

        {page === "about" && (
          <div style={cardStyle}>
            <h1>About Us</h1>
            <p>
              ADMAN Smart Parking uses AI to detect real-time parking occupancy
              and display it through a web dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const navButtonStyle = {
  background: "transparent",
  color: "white",
  border: "1px solid white",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "16px",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  minWidth: "220px",
};

export default App;