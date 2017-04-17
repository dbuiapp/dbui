import React, { Component } from "react";
import { Sidebar, Menu, Segment } from "semantic-ui-react";
import DataSourceList from "./DataSourceList";
import DataSource from "./DataSource";
import { observer, inject } from "mobx-react";

import Tab from "./common/Tab";

@inject("store") @observer
export default class Layout extends Component {
  render () {
    const { store } = this.props;
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation="uncover" vertical visible={store.ui.showMenu}>
          <DataSourceList />
        </Sidebar>
        <Sidebar.Pusher>
          <DataSource />
          <Tab>
            <Tab.Pane name="blah">contetn</Tab.Pane>
            <Tab.Pane name="blah2">content</Tab.Pane>
          </Tab>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
