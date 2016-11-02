import React, { Component } from 'react';
import classNames from 'classnames';
import * as datasources from '../../datasources/';
import { connect } from 'react-redux';
import ConnectionSelector from './ConnectionSelector';
import { closeConnection, selectConnection } from '../../modules/connections/actions';

class ConnectionsList extends Component {
  closeConnection = (event) => {
    event.stopPropagation();
    const { dispatch } = this.props;
    const target = event.target;
    const id = target.getAttribute('data-id');
    dispatch(closeConnection({ id }));
  }

  selectConnection = (event) => {
    const { dispatch } = this.props;
    const target = event.target;
    const id = target.getAttribute('data-id');
    dispatch(selectConnection({ id }));
  }

  render () {
    const { store, existingConnections, currentConnection } = this.props;
    return (
      <div className="small-12 medium-3 columns connections-panel">
        <ul className="connections no-bullet">
          {existingConnections.map((connection) => {
            const selected = connection.id == (currentConnection && currentConnection.id);
            return (
              <li key={connection.id} className={classNames({connection:1, button:1, secondary:1, expanded:1, selected})} data-id={connection.id} onClick={this.selectConnection}>
                {React.createElement(datasources[connection.type].ConnectionListView, { connection })}
                <a className="close-button button alert tiny" onClick={this.closeConnection} data-id={connection.id}>×</a>
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
};

export default connect(state => ({
  existingConnections: state.connections.existingConnections || [],
  currentConnection: state.connections.currentConnection
}))(ConnectionsList);
