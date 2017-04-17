import React, { Component } from "react";
import { Segment, Button, Container, Form, Message } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import * as datasources from "../datasources";

@inject("store") @observer
export default class DataSource extends Component {
  renderConnection (connection) {
    if (!connection) {
      return <Segment>Please choose a data source</Segment>;
    }
    const { type } = connection;
    const datasource = datasources[type];
    if (!datasource) {
      return <Message negative>Data source is not recognized</Message>;
    }
    if (!datasource.Connection) {
      return <Message negative>Data source does not contain Connection component.</Message>;
    }
    return <datasource.Connection params={connection.params} />;
  }

  render () {
    const { store } = this.props;
    return (
      <div>
        <Container>
          {this.renderConnection(store.datasource.selected)}
        </Container>
      </div>
    )
  }
}
