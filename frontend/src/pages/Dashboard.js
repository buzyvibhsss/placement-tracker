import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col } from "react-bootstrap";

const API = "https://placement-tracker-api.onrender.com";

function Dashboard() {
  const [companies, setCompanies] = useState([]); // ALWAYS array

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(`${API}/companies`);

        if (Array.isArray(res.data)) {
          setCompanies(res.data);
        } else {
          setCompanies([]);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setCompanies([]);
      }
    }

    fetchData();
  }, []);

  const appliedCount = companies.filter(
    (c) => c.status === "Applied"
  ).length;

  const interviewCount = companies.filter(
    (c) => c.status === "Interview"
  ).length;

  const offerCount = companies.filter(
    (c) => c.status === "Offer"
  ).length;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Dashboard</h2>

      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Applied</Card.Title>
              <h3>{appliedCount}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Interviews</Card.Title>
              <h3>{interviewCount}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Offers</Card.Title>
              <h3>{offerCount}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
