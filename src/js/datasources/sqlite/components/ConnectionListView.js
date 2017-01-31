import React, { Component } from 'react';
import { connect } from 'react-redux';
import { name } from '../';
import { shortenPath } from '../../../util';

export class ConnectionListView extends Component {
  render() {
    const { connection } = this.props;

    return (
      <div className="sqlite listview">
        <div className="connection-description">{name}: {shortenPath(connection.path)}</div>
      </div>
    );
  }
}

export default connect()(ConnectionListView);
