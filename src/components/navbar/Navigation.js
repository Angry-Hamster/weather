import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>Open Weather Map</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/map">Map</Nav.Link>
              <Nav.Link href="/chart">Chart</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Navigation;