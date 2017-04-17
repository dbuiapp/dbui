import React, { Component } from "react";
import { Segment, Button, Container } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import * as datasources from "../datasources";

@inject("store") @observer
export default class DataSource extends Component {
  renderConnection () {

  }

  render () {
    const { store } = this.props;
    return (
      <div>
        <Button onClick={event => store.ui.toggleShowMenu()}>Hide</Button>
        <Container>
          {this.renderConnection(store.datasource.selected)}
        </Container>
      </div>
    )
  }
}
