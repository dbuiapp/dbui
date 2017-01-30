import React, { Component } from 'react';
import * as datasources from '../../datasources';
import { connect } from 'react-redux';

class CurrentConnection extends Component {
  selectConnection(connection) {
    const datasource = datasources[connection && connection.type];
    return datasource ? React.createElement(datasource.components.ConnectionView, { connection }) : (
      <div>
        Please select a connection
      </div>
    );
  }

  componentWillReceiveProps(props) {
    console.log({ props });
  }

  render() {
    const { currentConnection } = this.props;
    return (
      <div className="small-12 medium-9 columns current-connection">
        {this.selectConnection(currentConnection)}
      </div>
    );
  }
}

export default connect(state => ({
  currentConnection: state.connections.currentConnection,
}))(CurrentConnection);
