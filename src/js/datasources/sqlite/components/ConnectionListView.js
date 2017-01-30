import React, { Component } from 'react';
import { connect } from 'react-redux';
import { name } from '../';

export class ConnectionListView extends Component {
  render() {
    const { connection } = this.props;

    return (
      <div className="sqlite listview">
        <div>{name}</div>
        <div className="connection-description">{connection.path}</div>
      </div>
    );
  }
}

export default connect()(ConnectionListView);
