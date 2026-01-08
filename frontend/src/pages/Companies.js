import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Table, Form } from "react-bootstrap";

const API = process.env.REACT_APP_API_URL;

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    role: "",
    status: "Applied",
  });

  const fetchCompanies = async () => {
    const res = await axios.get(`${API}/companies`);
    setCompanies(res.data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const addCompany = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/companies`, form);
    setForm({ name: "", role: "", status: "Applied" });
    setShowForm(false);
    fetchCompanies();
  };

  const deleteCompany = async (id) => {
    await axios.delete(`${API}/companies/${id}`);
    fetchCompanies();
  };

  const filteredCompanies =
    filter === "All"
      ? companies
      : companies.filter((c) => c.status === filter);

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Companies</h2>

      <Button onClick={() => setShowForm(!showForm)} className="mb-3">
        {showForm ? "Close Form" : "Add Company"}
      </Button>

      {showForm && (
        <Form onSubmit={addCompany} className="mb-4">
          <Form.Control
            className="mb-2"
            placeholder="Company Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Form.Control
            className="mb-2"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          />
          <Form.Select
            className="mb-2"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option>Applied</option>
            <option>OA</option>
            <option>Interview</option>
            <option>Rejected</option>
            <option>Offer</option>
          </Form.Select>

          <Button type="submit">Save</Button>
        </Form>
      )}

      <Form.Select
        className="mb-3"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        <option>All</option>
        <option>Applied</option>
        <option>OA</option>
        <option>Interview</option>
        <option>Rejected</option>
        <option>Offer</option>
      </Form.Select>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Company</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCompanies.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.role}</td>
              <td>{c.status}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deleteCompany(c.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Companies;

