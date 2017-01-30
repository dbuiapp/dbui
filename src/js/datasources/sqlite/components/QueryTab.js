import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectionAction } from '../../../modules/connections/actions';
import QueryResult from './QueryResult';

export class QueryTab extends Component {

  onSubmit = (event) => {
    event.preventDefault();

    const { dispatch, connection: { id, type } } = this.props;
    const action = 'runQuery';
    const form = event.target;
    const query = form.query.value;

    dispatch(connectionAction({ id, type, action, query }));
  }

  render() {
    const { connection } = this.props;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input type="text" name="query" />
          <input type="submit" className="button primary" value="submit" />
        </form>
        <ul className="no-bullet">
          {(connection.queries || []).map((query, index) => (
            <li key={index}>
              {React.createElement(QueryResult, { query, connection, index })}
            </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default connect()(QueryTab);
