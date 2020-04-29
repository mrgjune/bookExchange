import React, { Component } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Card.scss";
import "./image.css";
import "./Card.scss";

class BookCard extends Component {
  render() {
    const {
      isbn,
      author,
      title,
      available,
      publisher,
      description,
    } = this.props.book;
    let a;
    let image = `http://localhost:3001/images/${this.props.book.book_image}`;

    return (
      <div className="pt-5">
        <Container>
          <Row>
            <Col xs={2}>
              <Card.Img className="pt-3" src={image} />
            </Col>
            <Col xs={9}>
              <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Author: {author}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Publishers: {publisher}
                </Card.Subtitle>
                <Card.Text>{description}</Card.Text>
                <a className="btn btn-primary mt-3" href={`/books/${isbn}`}>
                  More Details
                </a>
              </Card.Body>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default BookCard;
