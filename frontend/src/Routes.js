import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import BookList from "./BookList";
import Book from "./Book";
import Home from "./Home";
import DisplaySearch from "./DisplaySearch";
import Navigation from "./NavBar";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route
            exact
            path="/search/:searchCategory/:school"
            render={(rtProps) => <DisplaySearch {...rtProps} />}
          />
          <Route
            exact
            path="/search/:searchCategory/:school/:searchTerm"
            render={(rtProps) => <DisplaySearch {...rtProps} />}
          />
          <Route exact path="/books" render={() => <BookList />} />
          <Route
            exact
            path="/books/:book"
            render={(rtProps) => <Book {...rtProps} />}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
