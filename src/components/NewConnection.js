import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Segment, Select, Message, Button, Form } from "semantic-ui-react";
import * as datasources from "datasources";

console.log(datasources);

const datasourceOptions = Object.entries(datasources)
  .map(([value, datasource]) => ({ text: datasource.displayName, value}));

@inject("store") @observer
export default class NewConnection extends Component {
  onSetNewType = (event, data) => {
    const { store } = this.props;
    store.datasource.setNewType(data.value);
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { store } = this.props;
    const type = store.datasource.newType;
    const form = event.target;
    const fields = datasources[type].ConnectionInfo.fields;
    const params = fields.reduce((params, field) => ({...params, [field]: form[field].value}), {});

    store.datasource.addConnection(type, params);
  }

  renderConnectionInfo = (type) => {
    if (!type) {
      return null;
    }
    const datasource = datasources[type];
    if (!datasource) {
      return <Message negative>Data source is not recognized</Message>;
    }
    if (!datasource.ConnectionInfo) {
      return <Message negative>Data source does not contain Connection ui.</Message>;
    }
    return <Form onSubmit={this.onSubmit}>
      <datasource.ConnectionInfo />
      <br />
      <Button type="submit" fluid>Submit</Button>
    </Form>;
  }

  render () {
    const { store } = this.props;

    return <div>
      <Segment basic>
        <Select fluid onChange={this.onSetNewType} placeholder="Select data type" options={datasourceOptions} value={store.datasource.newType || null} />
        <br />
        {this.renderConnectionInfo(store.datasource.newType)}
      </Segment>
    </div>;
  }
}
