import React, { Component } from 'react';
// this is broken for some reason
//import d3 from 'd3';
const d3 = require('d3');
const nv = require('nvd3');

export default class BarGraph extends Component {
  componentDidUpdate () {
    this.draw();
  }

  componentDidMount () {
    this.draw();
  }

  draw () {
    const { visualization } = this.props;
    const { svg, container } = this.refs;

    if (!visualization || !visualization.results) {
      return;
    }
    svg.setAttribute('width', container.offsetWidth);
    svg.setAttribute('height', 200);
    var data = visualization.results;

    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
          .x(val => val.x)
          .y(val => val.y)
          .staggerLabels(true)
          .showValues(true);

        d3.select(svg)
            .datum([{key: 'usernames', values: visualization.results}])
            .call(chart);

        return chart;
    });
  }

  render () {
    const { visualization } = this.props;
    return (
      <div ref="container" className="visualization bar-graph">
        <svg ref="svg" />
        {JSON.stringify(visualization)}
      </div>
    );
  }
};
