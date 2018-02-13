import React, { Component } from "react";
import { Form, Input, Loader, Icon, Button } from "semantic-ui-react";
import { observer, inject } from "mobx-react";

@inject("store") @observer
export default class SchemaPane extends Component {
  componentDidMount () {
    const { store, connection } = this.props;
    const connectionData = store.datasource.connectionData[connection.id];
    if (!connectionData.schema) {
      connectionData.loadSchema();
    }
  }

  onRefreshClick = (event) => {
    const { store, connection } = this.props;
    const connectionData = store.datasource.connectionData[connection.id];
    connectionData.loadSchema();
  }

  render () {
    const { store, connection } = this.props;
    const connectionData = store.datasource.connectionData[connection.id];

    return connectionData.schema ? <div>
      <Button primary onClick={this.onRefreshClick}><Icon name="undo" /></Button>
      {connectionData.schema.loading && <Loader active />}
      <pre>{JSON.stringify(connectionData.schema.meta, null, 2)}</pre>
    </div> : null;
  }
}
