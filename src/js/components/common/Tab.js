import React, { Component, PropTypes } from 'react';

export default class Tab extends Component {
  static propTypes = {
    tabId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  };

  render () {
    return this.props.children;
  }
}
