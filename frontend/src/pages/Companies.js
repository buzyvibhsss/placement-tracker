import { useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

function Companies({ companies, fetchCompanies }) {
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    role: "",
    status: "Applied"
  });

  const [filter, setFilter] = useState("All");

  // ADD COMPANY
  const addCompany = async () => {
    if (!form.name || !form.role) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post("https://placement-tracker-api.onrender.com", form);
      fetchCompanies();
      setForm({ name: "", role: "", status: "Applied" });
      setShowForm(false); // close form after add
    } catch (err) {
      console.log("Add error:", err);
      alert("Failed to add company");
    }
  };
S
  // DELETE COMPANY
  const deleteCompany = async (id) => {
    const ok = window.confirm("Delete this company?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/companies/${id}`);
      fetchCompanies();
    } catch (err) {
      console.log("Delete error:", err);
      alert("Failed to delete company");
    }
  };

  const filteredCompanies =
    filter === "All"
      ? companies
      : companies.filter(c => c.status === filter);

  return (
    <Layout>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px"
        }}
      >
        <h1>Companies</h1>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close" : "+ Add Company"}
        </button>
      </div>

      {/* ADD COMPANY FORM (CONDITIONAL) */}
      {showForm && (
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            maxWidth: "500px",
            boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
          }}
        >
          <h4>Add Company</h4>

          <input
            className="form-control mb-2"
            placeholder="Company Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="form-control mb-2"
            placeholder="Role"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          />

          <select
            className="form-select mb-3"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option>Applied</option>
            <option>Interview</option>
            <option>Selected</option>
            <option>Rejected</option>
          </select>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className="btn btn-success" onClick={addCompany}>
              Save
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* FILTER */}
      <select
        className="form-select mb-4"
        style={{ maxWidth: "220px" }}
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Applied</option>
        <option>Interview</option>
        <option>Selected</option>
        <option>Rejected</option>
      </select>

      {/* COMPANY LIST */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filteredCompanies.map(c => (
          <div
            key={c.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "14px",
              width: "260px",
              boxShadow: "0 10px 20px rgba(0,0,0,0.08)"
            }}
          >
            <h4>{c.name}</h4>
            <p>{c.role}</p>

            <span
              style={{
                display: "inline-block",
                marginBottom: "10px",
                padding: "5px 10px",
                borderRadius: "8px",
                fontSize: "12px",
                background:
                  c.status === "Applied"
                    ? "#e5e7eb"
                    : c.status === "Interview"
                    ? "#fde68a"
                    : c.status === "Selected"
                    ? "#bbf7d0"
                    : "#fecaca"
              }}
            >
              {c.status}
            </span>

            <button
              className="btn btn-danger btn-sm mt-2"
              onClick={() => deleteCompany(c.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export default Companies;
