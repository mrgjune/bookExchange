import React, { Component } from "react";
import {
  Form,
  FormLabel,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import BooklyApi from "./BooklyApi";
import Book from "./Book";
class CheckOutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      school_handle: "Skidmore",
      email: "",
      isbn: this.props.book,
      submitted: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  async handleSubmit(evt) {
    evt.preventDefault();
    await BooklyApi.sendRequest(this.state);
    this.setState({ submitted: true });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let request;
    if (this.state.submitted) {
      request = <div>Form Submitted!</div>;
    } else {
      request = (
        <Form onSubmit={this.handleSubmit}>
          <FormLabel>First name </FormLabel>
          <FormControl
            onChange={this.handleChange}
            value={this.state.first_name}
            name="first_name"
            type="text"
          />
          <FormLabel>Last name </FormLabel>
          <FormControl
            value={this.state.last_name}
            name="last_name"
            onChange={this.handleChange}
            type="text"
          />
          <FormLabel>Email: </FormLabel>
          <FormControl
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            type="email"
          />
          <FormLabel>School</FormLabel>
          <FormControl
            value={this.state.school_handles}
            name="school_handle"
            onChange={this.handleChange}
            as="select"
          >
            <option>Skidmore</option>
            <option>Hamilton</option>
            <option>St Lawerence</option>
            <option>Union</option>
            <option> Hobart and William Smith</option>
          </FormControl>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    }

    return request;
  }
}

export default CheckOutForm;
