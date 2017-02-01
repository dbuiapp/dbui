import React, { Component } from 'react';
import d3 from 'd3';

export default class LineGraph extends Component {
  render() {
    const { visualization } = this.props;
    return (
      <div className="visualization line-graph">
        {JSON.stringify(visualization)}
      </div>
    );
  }
}
