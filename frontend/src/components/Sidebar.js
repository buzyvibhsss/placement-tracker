import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Nav className="flex-column p-3">
      <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
      <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
      <Nav.Link as={Link} to="/analytics">Analytics</Nav.Link>
    </Nav>
  );
}

export default Sidebar;
