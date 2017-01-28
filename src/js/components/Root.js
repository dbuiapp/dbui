import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Header, Body, Footer } from './layout';

class Root extends Component {

  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <div className="container">
          <Header />
          <Body />
          <Footer />
        </div>
      </Provider>
    );
  }
}

export default Root;
