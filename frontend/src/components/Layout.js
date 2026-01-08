import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "react-bootstrap";

function Layout() {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light min-vh-100">
          <Sidebar />
        </Col>
        <Col md={10}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Layout;

