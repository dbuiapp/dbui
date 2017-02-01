import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectionAction } from '../../../modules/connections/actions';
import visualizations from '../visualizations';

export class Visualization extends Component {
  getVisualization(visualization) {
    console.log(visualization, this.props);
    const visualizationInfo = visualizations[visualization.visType];

    if (visualizationInfo) {
      return React.createElement(visualizationInfo.components.graph, { visualization });
    }
    return null;
  }

  render() {
    const { visualization } = this.props;

    return (
      <div className="visualization">
        <a className="refresh-button" onClick={this.onRefresh}>↺</a>
        <a className="remove-button" onClick={this.onRemove}>×</a>
        {this.getVisualization(visualization)}
      </div>
    );
  }
}

export default connect()(Visualization);
