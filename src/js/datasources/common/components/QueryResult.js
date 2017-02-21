import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectionAction } from '../../../modules/connections/actions';


export class QueryResult extends Component {

  onRemove = (event) => {
    const { query, connection: { type, id }, index, dispatch } = this.props;
    const action = 'removeQuery';

    dispatch(connectionAction({ type, id, action, index }));
  }

  resultTable(results) {
    if (!results || !results.length) {
      return 'No results';
    }
    const fields = Object.keys(results[0]);

    return (
      <table>
        <thead>
          <tr>
            {fields.map((field, index) => (
              <th key={index}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              {fields.map(field => (
                <td>{result[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    const { query, connection, index } = this.props;

    return (
      <div className="result">
        {/* <a className="refresh-button" onClick={this.onRefresh}>↺</a>*/}
        <a className="remove-button" onClick={this.onRemove}>×</a>
        <div className="result-query">{query.query}</div>
        {this.resultTable(query.results)}
      </div>
    );
  }
}

export default connect()(QueryResult);
