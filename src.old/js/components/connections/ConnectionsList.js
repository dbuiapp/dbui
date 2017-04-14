import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import * as datasources from '../../datasources/';
import ConnectionSelector from './ConnectionSelector';
import { closeConnection, selectConnection } from '../../modules/connections/actions';

class ConnectionsList extends Component {
  closeConnection = connection => (event) => {
    event.stopPropagation();
    const { dispatch } = this.props;
    const target = event.target;
    dispatch(closeConnection(connection));
  }

  selectConnection = connection => (event) => {
    const { dispatch } = this.props;
    const target = event.target;
    dispatch(selectConnection(connection));
  }

  render() {
    const { store, existingConnections, currentConnection } = this.props;
    return (
      <div className="small-12 medium-3 columns connections-panel">
        <ul className="connections no-bullet">
          {existingConnections.map((connection) => {
            const selected = connection.id === (currentConnection && currentConnection.id);
            return (
              <li key={connection.id}>
                <div
                  className={classNames('connection button secondary expanded', { selected })}
                  onClick={this.selectConnection(connection)}
                >
                  {React.createElement(datasources[connection.type].components.ConnectionListView, { connection })}
                  <a className="close-button" onClick={this.closeConnection(connection)}>×</a>
                </div>
              </li>
            );
          })}
          <li className="new-connection">
            <ConnectionSelector />
          </li>
        </ul>
      </div>
    );
  }
}

export default connect(state => ({
  existingConnections: state.connections.existingConnections || [],
  currentConnection: state.connections.currentConnection,
}))(ConnectionsList);
