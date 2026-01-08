import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";

const API = "https://placement-tracker-api.onrender.com";

function Dashboard() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${API}/companies`);

        if (Array.isArray(res.data)) {
          setCompanies(res.data);
        } else {
          setCompanies([]);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setCompanies([]);
      }
    };

    fetchCompanies();
  }, []);

  const applied = companies.filter((c) => c.status === "Applied").length;
  const interview = companies.filter((c) => c.status === "Interview").length;
  const offer = companies.filter((c) => c.status === "Offer").length;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Applied</Card.Title>
              <h3>{applied}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Interviews</Card.Title>
              <h3>{interview}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Offers</Card.Title>
              <h3>{offer}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
