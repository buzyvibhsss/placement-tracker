import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "white" : "#cbd5e1",
    textDecoration: "none",
    fontWeight: location.pathname === path ? "600" : "400"
  });

  return (
    <div
      style={{
        width: "220px",
        background: "#111827",
        color: "white",
        padding: "25px",
        minHeight: "100vh"
      }}
    >
      <h2 style={{ marginBottom: "40px" }}>🎓 Placement</h2>

      <p><Link to="/" style={linkStyle("/")}>📊 Dashboard</Link></p>
      <p><Link to="/companies" style={linkStyle("/companies")}>🏢 Companies</Link></p>
      <p><Link to="/analytics" style={linkStyle("/analytics")}>📈 Analytics</Link></p>
    </div>
  );
}

export default Sidebar;
