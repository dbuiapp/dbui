import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';

@inject("store") @observer
export default class Connection extends Component {

  render () {
    const { params } = this.props;

    return (
      <div>
        <h1>SQLite</h1>
        
      </div>
    );
  }
}
