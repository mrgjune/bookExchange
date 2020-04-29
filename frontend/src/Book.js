import React, { Component } from "react";
import "./image.css";
import BooklyApi from "./BooklyApi";
import { Container, Button, Row, Col, Card } from "react-bootstrap";
import CheckOutForm from "./checkOutForm";
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      displayForm: false,
    };

    this.displayForm = this.displayForm.bind(this);
  }

  async componentDidMount() {
    const isbn = this.props.match.params.book;

    let book = await BooklyApi.getBook(isbn);
    this.setState({ book });
  }
  displayForm() {
    this.setState({ displayForm: true });
  }

  render() {
    let displayForm;
    if (this.state.displayForm) {
      displayForm = (
        <div>
          <CheckOutForm book={this.state.book.isbn} />
        </div>
      );
    }

    let available;

    let image = `/images/${this.state.book.book_image}`;
    if (this.state.book.available) {
      available = <Card.Text>Available</Card.Text>;
    } else {
      available = <Card.Text>Checked out</Card.Text>;
    }

    return (
      <Container className="justify-content-md-center">
        <Row className="justify-content-md-center">
          <Col xs={2}>
            <Card.Img className="pt-3" src={image} />
          </Col>
          <Col>
            <Card.Body>
              <Card.Title>{this.state.book.title}</Card.Title>
              <Card.Text>Author: {this.state.book.author}</Card.Text>
              {/* <Card.Text>Copyright Year: {this.state.books.copyright_year}</Card.Text> */}
              <Card.Text>Subject: {this.state.book.subject_type}</Card.Text>
              <Card.Text>Isbn: {this.state.book.isbn}</Card.Text>
              {available}
              <Card.Text>School: {this.state.book.school_handle}</Card.Text>
              <Card.Text>Publisher: {this.state.book.publisher}</Card.Text>

              <Button onClick={this.displayForm}>Request Book</Button>
            </Card.Body>
          </Col>
          <Col className="justify-content-md-right pt-4">
            <Card.Title>About the Book: </Card.Title>
            <Card.Text>{this.state.book.description}</Card.Text>
          </Col>
        </Row>

        {displayForm}
      </Container>
    );
  }
}

export default Book;
