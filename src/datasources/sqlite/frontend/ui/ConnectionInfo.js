import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

@inject("store") @observer
export default class ConnectionInfo extends Component {

  static fields = ["path"];

  render () {
    const { params } = this.props;
    return (
      <div>
        <Input name="path" placeholder="Database path" defaultValue={params && params.path} fluid />
      </div>
    );
  }
}
