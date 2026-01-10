import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "white" : "#cbd5e1",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "600" : "400",
    display: "block",
    marginBottom: "18px"
  });

  return (
    <div
      style={{
        width: "240px",
        background: "linear-gradient(180deg, #020617, #111827)",
        color: "white",
        padding: "25px",
        minHeight: "100vh"
      }}
    >
      {/* App Branding */}
      <div style={{ marginBottom: "45px" }}>
        <h2 style={{ marginBottom: "8px" }}>🎓 Placement</h2>

        {/* Name Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "4px 10px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.08)",
            fontSize: "13px",
            color: "#e5e7eb"
          }}
        >
          <span style={{ fontSize: "14px" }}>✨</span>
          <span>Vibhanshi Rajput</span>
          <span style={{ fontSize: "14px" }}>✨</span>
        </div>
      </div>

      {/* Navigation */}
      <nav>
        <Link to="/" style={linkStyle("/")}>
          📊 Dashboard
        </Link>

        <Link to="/companies" style={linkStyle("/companies")}>
          🏢 Companies
        </Link>

        <Link to="/analytics" style={linkStyle("/analytics")}>
          📈 Analytics
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;
