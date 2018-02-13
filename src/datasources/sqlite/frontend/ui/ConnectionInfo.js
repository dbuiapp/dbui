import React, { Component } from "react";
import { Input, Label } from "semantic-ui-react";
import { inject, observer } from "mobx-react";

@inject("store") @observer
export default class ConnectionInfo extends Component {

  static fields = ["path"];

  render () {
    const { params, disabled } = this.props;
    return (
      <div>
        <label>Path</label>
        <Input name="path" disabled={disabled} placeholder="Database path" defaultValue={params && params.path} fluid />
      </div>
    );
  }
}
