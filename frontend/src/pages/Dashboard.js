import Layout from "../components/Layout";

function Dashboard({ companies }) {
  const total = companies.length;
  const applied = companies.filter(c => c.status === "Applied").length;
  const interview = companies.filter(c => c.status === "Interview").length;
  const selected = companies.filter(c => c.status === "Selected").length;

  return (
    <Layout>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #6366f1, #3b82f6)",
          color: "white",
          padding: "30px",
          borderRadius: "16px",
          marginBottom: "30px"
        }}
      >
        <h1>Placement Tracker</h1>
        <p>Track your applications in one place</p>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Stat title="Total Applications" value={total} icon="📄" />
        <Stat title="Applied" value={applied} icon="📝" />
        <Stat title="Interviews" value={interview} icon="🎤" />
        <Stat title="Selected" value={selected} icon="🎉" />
      </div>
    </Layout>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "14px",
        minWidth: "200px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
      }}
    >
      <div style={{ fontSize: "26px" }}>{icon}</div>
      <h2>{value}</h2>
      <p style={{ color: "#6b7280" }}>{title}</p>
    </div>
  );
}

export default Dashboard;
