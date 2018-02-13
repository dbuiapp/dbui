import React, { Component } from "react";
import { Input, Label, Form } from "semantic-ui-react";
import { inject, observer } from "mobx-react";

@inject("store") @observer
export default class ConnectionInfo extends Component {

  static fields = ["path"];

  render () {
    const { params, disabled } = this.props;
    return (
      <div>
        <label>Host</label>
        <Input name="host" disabled={disabled} placeholder="Host" defaultValue={params && params.path} fluid />
        <br />
        <label>Port</label>
        <Input name="port" disabled={disabled} placeholder="Port" defaultValue={params && params.path} fluid />
        <br />
        <label>Database</label>
        <Input name="database" disabled={disabled} placeholder="Database" defaultValue={params && params.path} fluid />
        <br />
        <label>Username</label>
        <Input name="username" disabled={disabled} placeholder="Username" defaultValue={params && params.path} fluid />
        <br />
        <label>Password</label>
        <Input name="password" disabled={disabled} placeholder="Password" defaultValue={params && params.path} fluid />
        <br />
      </div>
    );
  }
}
