import React, { Component } from "react";
import { Navbar, Nav, Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";

class Navigation extends Component {
  render() {
    return (
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Row className="ml-5">
              <Col className="pb-0">
                <Navbar.Brand
                  expan="lg"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 50,
                  }}
                  href="/"
                >
                  <div style={{ color: "black" }}>New York Six</div>
                  <div className="pl-6 pb-0" style={{ color: "green" }}>
                    Book Exchange
                  </div>
                </Navbar.Brand>
              </Col>
            </Row>
          </Nav>
          <Nav>
            <SearchBar />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
export default Navigation;
