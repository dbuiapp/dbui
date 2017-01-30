import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectionAction } from '../../../modules/connections/actions'

export class QueryResult extends Component {

  onRefresh = (event) => {

  }

  render() {
    const { query, connection, index } = this.props;

    return (
      <div className="result">
        <div className="">< className=""></a></div>
        <div className="result-query">{query.query}</div>
        <ul className="no-bullet">
          {(query.results || []).map((result, index) => {
            return (
              <li className="result-row" key={index}>
                {
                  Object.entries(result).map(([key, value]) => {
                    return (
                      <span title={key} key={key}>
                        {value}
                      </span>
                    );
                  })
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default connect()(QueryResult);
