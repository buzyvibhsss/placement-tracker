import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "30px", background: "#f5f6fa", flex: 1, minHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
