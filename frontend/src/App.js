import React, { Component } from "react";
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div>
        <Routes {...this.props} />
      </div>
    );
  }
}

export default App;
