import React, { Component } from "react";
import { Segment, Button, Container } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import * as datasources from "datasources";

@inject("store") @observer
export default class DataSource extends Component {
  renderConnection (selected) {
    if (!selected || !datasources[selected.type]) {
      return <Segment ><h1>Please select a data source.</h1></Segment>;
    }
    const Element = datasources[selected.type].Connection;
    return <Element connection={selected} />;
  }

  render () {
    const { store } = this.props;
    return (
      <div>
        <Container>
          {this.renderConnection(store.datasource.selected)}
        </Container>
      </div>
    )
  }
}
