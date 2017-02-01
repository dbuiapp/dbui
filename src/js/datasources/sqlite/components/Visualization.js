import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectionAction } from '../../../modules/connections/actions';
import visualizations from '../visualizations';

export class Visualization extends Component {

  onRemove = (event) => {
    const { query, connection: { type, id }, index, dispatch } = this.props;
    const action = 'removeVisualization';

    dispatch(connectionAction({ type, id, action, index }));
  }

  getVisualization(visualization, dimensions) {
    const visualizationInfo = visualizations[visualization.visType];

    if (visualizationInfo) {
      return React.createElement(visualizationInfo.components.graph, { visualization, dimensions });
    }
    return null;
  }

  render() {
    console.log(this.props);
    const { visualization, dimensions, index } = this.props;

    return (
      <div className="visualization">
        {/* <a className="refresh-button" onClick={this.onRefresh}>↺</a>*/}
        <div>
          {`Visualization # ${index}`}
          <a className="remove-button" onClick={this.onRemove}>×</a>
        </div>
        {this.getVisualization(visualization)}
      </div>
    );
  }
}

export default connect(state => ({
  dimensions: state.ui.dimensions,
}))(Visualization);
