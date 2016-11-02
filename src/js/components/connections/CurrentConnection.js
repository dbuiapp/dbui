import React, { Component } from 'react';
import * as datasources from '../../datasources';
import { connect } from 'react-redux';

class CurrentConnection extends Component {
  selectConnection (currentConnction) {\
    const datasource = datasources[currentConnction && currentConnction.type];
    return datasource ? React.createElement(datasource.ConnectionView) : (
      <div>
        Please select a connection
      </div>
    );
  }

  render () {
    const { store, currentConnection } = this.props;
    return (
      <div className="small-12 medium-9 columns current-connection">
        {this.selectConnection(currentConnection)}
      </div>
    );
  }
};

export default connect(state => ({
  currentConnction: state.connections.currentConnction
}))(CurrentConnection);
