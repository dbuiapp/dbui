import React, { Component } from "react";
import { Form, Input, Accordion, Loader } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@inject("store") @observer
export default class QueryPane extends Component {
  onSubmit = (event) => {
    const { connection, store } = this.props;
    const query = event.target.query.value;
    event.preventDefault();

    store.datasource.connectionData[connection.id].addQuery(query);
  }

  render () {
    const { store, connection } = this.props;
    return <div>
      <Form onSubmit={this.onSubmit}>
        <Input fluid name="query" placeholder="Query" action="Submit" />
      </Form>
      <ul>
      {
        store.datasource.connectionData[connection.id].queries.map(queryData => {
          return <li>
            <p>{queryData.query}</p>
            <p>{queryData.loading && <Loader active inline />}</p>
            <p>{JSON.stringify(queryData.rows)}</p>
          </li>;
        })
      }
      </ul>
    </div>;
  }
}
