import React, { Component } from 'react';
import { connect } from 'react-redux';
import { name } from '../';

export class ConnectionListView extends Component {
  render() {
    const { connection } = this.props;
    const { type } = connection;

    return (
      <div className={`${type} listview`}>
        <div className="connection-description">{name}: {}</div>
      </div>
    );
  }
}

export default connect()(ConnectionListView);
