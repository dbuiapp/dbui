import React, { Component, PropTypes } from 'react';

export default class Tab extends Component {
  /* eslint-disable react/no-unused-prop-types */
  static propTypes = {
    tabId: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };
  /* eslint-enable react/no-unused-prop-types */

  render() {
    return this.props.children;
  }
}
