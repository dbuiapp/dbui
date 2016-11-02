import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConnectionsList, CurrentConnection } from '../connections';

class Body extends Component {
  render () {
    const { store } = this.props;
    return (
      <div className="row">
        <ConnectionsList />
        <CurrentConnection />
      </div>
    );
  }
};

export default connect()(Body);
