import React, { Component } from "react";
import { Sidebar, Container, Menu, Segment, Grid, Icon } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import DataSourceList from "components/DataSourceList";
import DataSource from "components/DataSource";

import Tab from "./common/Tab";

@inject("store") @observer
export default class Layout extends Component {
  onToggleMenu = (event) => {
    const { store } = this.props;
    event.preventDefault();
    store.ui.toggleShowMenu();
  }

  render () {
    const { store } = this.props;
    return (
      <Sidebar.Pushable as={Segment}>
        <Sidebar as={Menu} animation="overlay" vertical visible={store.ui.showMenu}>
          <DataSourceList />
        </Sidebar>
        <Sidebar.Pusher>
          <Container>
            <Grid columns={ 2 }>
              {
                store.ui.showMenu &&
                <Grid.Column width={4}>
                </Grid.Column>
              }
              <Grid.Column width={store.ui.showMenu ? 12 : 16}>
                <a href="javascript:">
                  <Icon size="large" name="bars" onClick={this.onToggleMenu}/>
                </a>
                <DataSource />
              </Grid.Column>
            </Grid>
          </Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    );
  }
}
