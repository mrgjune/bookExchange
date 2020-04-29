import React, { Component } from "react";
import BooklyApi from "./BooklyApi";
import BookList from "./BookList";
class DisplaySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null,
    };
  }

  componentDidMount() {
    BooklyApi.getBooks(
      this.props.match.params.searchTerm,
      this.props.match.params.searchCategory,
      this.props.match.params.school
    ).then((books) => {
      this.setState({ books });
      this.setState(this.props.match.params);
      if (this.state.searchTerm && !this.props.match.params.searchTerm) {
        this.setState({ searchTerm: undefined });
      }
    });
  }
  componentDidUpdate() {
    if (
      this.props.match.params.searchTerm !== this.state.searchTerm ||
      this.props.match.params.searchCategory !== this.state.searchCategory ||
      this.props.match.params.school !== this.state.school
    ) {
      BooklyApi.getBooks(
        this.props.match.params.searchTerm,
        this.props.match.params.searchCategory,
        this.props.match.params.school
      ).then((books) => {
        this.setState({ books });
        this.setState(this.props.match.params);
        if (this.state.searchTerm && !this.props.match.params.searchTerm) {
          this.setState({ searchTerm: undefined });
        }
      });
    }
  }

  render() {
    return <BookList books={this.state.books} />;
  }
}
export default DisplaySearch;
