import React, { Component } from "react";
import { Card, Container, Row, Carousel } from "react-bootstrap";

class Home extends Component {
  render() {
    return (
      <Container className="pt-4">
        <Row className="justify-content-md-center">
          <h2>Welcome To the New York Six Book Exchange </h2>
        </Row>
        <Row className="justify-content-md-center">
          <h5 className="text-secondary">
            This site's mission is to help students try to reduce the cost of
            textboks by working with the{" "}
            <Card.Link href="https://www.newyork6.org">
              New York Six Colleges
            </Card.Link>
          </h5>
        </Row>

        <Carousel>
          <Carousel.Item>
            <img
              style={{ width: "2000px", height: "400px" }}
              src="http://localhost:3001/images/skidmore.jpeg"
              alt="Skidmore College"
            />
            <Carousel.Caption>
              <p>Skidmore College</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "2000px", height: "400px" }}
              src="http://localhost:3001/images/hamilton.jpeg"
              alt="Hamilton College"
            />

            <Carousel.Caption>
              <p>Hamilton College"</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "2000px", height: "400px" }}
              src="http://localhost:3001/images/hws.jpeg"
              alt="hws college"
            />
            <Carousel.Caption>
              <p>Hobart William and Smith College</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "2000px", height: "400px" }}
              src="http://localhost:3001/images/union.jpeg"
              alt="Union College"
            />
            <Carousel.Caption>
              <p>Union College</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "2000px", height: "400px" }}
              src="http://localhost:3001/images/slu.jpeg"
              alt="St Lawerence University"
            />
            <Carousel.Caption>
              <p>St Lawerence University</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={{ width: "2000px", height: "400px" }}
              src="http://localhost:3001/images/colgate.jpeg"
              alt="Colgate University"
            />

            <Carousel.Caption>
              <p>Colgate University</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}

export default Home;
