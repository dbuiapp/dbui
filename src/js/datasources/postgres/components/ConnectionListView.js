import React, { Component } from 'react';
import { connect } from 'react-redux';
import { name } from '../';
import { shortenPath } from '../../../util';

export class ConnectionListView extends Component {
  render() {
    const { connection } = this.props;
    console.log(connection);

    return (
      <div className="postgres listview">
        <div className="connection-description">{name}: {connection.host}/{connection.database}</div>
      </div>
    );
  }
}

export default connect()(ConnectionListView);
