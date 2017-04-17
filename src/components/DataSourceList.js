import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import NewConnection from "./NewConnection";
import * as datasources from "../datasources";

@inject("store") @observer
export default class DataSourceList extends Component {
  render () {
    const { store } = this.props;
    return (
      <div>
        <Segment vertical>
          <NewConnection />
        </Segment>
      </div>
    );
  }
}
