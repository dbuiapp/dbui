import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectionAction } from '../../../modules/connections/actions';
import QueryResult from './QueryResult';

export class SchemaTab extends Component {

  onRefresh = () => {
    const { dispatch, connection: { id, type } } = this.props;
    const action = 'getSchema';

    dispatch(connectionAction({ id, type, action }));
  }

  resultTable(results) {
    if (!results || !results.length) {
      return 'No results';
    }
    const fields = Object.keys(results[0]);
    console.log(fields, results);
    return (
      <table>
        <thead>
          <tr>
            {fields.map(field => (
              <th>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map(result => (
            <tr>
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
    const { connection } = this.props;
    return (
      <div>
        <div>
          <a className="button" onClick={this.onRefresh}>Refresh</a>
        </div>
        {this.resultTable(connection.schema)}
      </div>
    );
  }
}

export default connect()(SchemaTab);
