import React, { Component } from 'react';

export default class BarGraphConfig extends Component {
  render() {
    return (
      <div className="visualization-config bar-graph-config">
        <div className="row">
          <div className="small-6 columns">
            <input type="text" name="xExpression" placeholder="X Expression" />
          </div>
          <div className="small-6 columns">
            <input type="text" name="yExpression" placeholder="Y Expression" />
          </div>
        </div>
        <div className="row">
          <div className="small-4 columns">
            <input type="text" name="joinExpressions" placeholder="Table" />
          </div>
          <div className="small-4 columns">
            <input type="text" name="whereExpressions" placeholder="Match Expression" />
          </div>
          <div className="small-4 columns">
            <input type="text" name="groupExpressions" placeholder="Group Expression" />
          </div>
        </div>
      </div>
    );
  }
}
