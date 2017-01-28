import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { store } = this.props;
    return (
      <header />
    );
  }
}

export default Header;
