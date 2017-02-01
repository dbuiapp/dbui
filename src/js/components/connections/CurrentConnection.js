import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as datasources from '../../datasources';

class CurrentConnection extends Component {
  componentWillReceiveProps(props) {
    console.log({ props });
  }

  render() {
    const { currentConnection } = this.props;
    const datasource = datasources[currentConnection && currentConnection.type];
    return (
      <div className="small-12 medium-9 columns current-connection">
        {
          datasource ?
            React.createElement(datasource.components.ConnectionView, { connection: currentConnection }) :
            (
              <div>
                Please select a connection
              </div>
            )
        }
      </div>
    );
  }
}

export default connect(state => ({
  currentConnection: state.connections.currentConnection,
}))(CurrentConnection);
