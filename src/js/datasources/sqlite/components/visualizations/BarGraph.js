import React, { Component } from 'react';
import d3 from 'd3';

export default class BarGraph extends Component {
  componentDidUpdate () {
    const { visualization } = this.props;
    const graph = d3.select(this.refs.svg);

    const margin = {top: 10, right: 30, bottom: 30, left: 30},
    const width = +svg.attr("width") - margin.left - margin.right,
    const height = +svg.attr("height") - margin.top - margin.bottom,
    const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const bar = graph
      .selectAll('.bar')
      .data(visualization.results)
      .enter().append("g")
      .attr("class", "bar")
      .attr("fill", "#00ff00")
      .attr("transform", function(d) {
        return "translate(" + x(d.x0) + "," + y(d.length) + ")";
      });;

    bar.append("rect")
      .attr("x", 1)
      .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
      .attr("height", function(d) { return height - y(d.length); });
  }

  render () {
    const { visualization } = this.props;
    console.log(this.props)
    return (
      <div className="visualization bar-graph">
        <svg ref="svg" />
        {JSON.stringify(visualization)}
      </div>
    );
  }
};
