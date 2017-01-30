import React, { Component } from 'react';

export default class Loader extends Component {
  render () {
    const { children, props } = this.props;
    return (
      <div {...props}>
        {children}
      </div>
    );
  }
}
