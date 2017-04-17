import React, { Component } from 'react';
import { Provider } from "mobx-react";
import Layout from "./Layout";

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    );
  }
}

export default App;
