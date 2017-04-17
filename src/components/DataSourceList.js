import React, { Component } from "react";
import { Menu, Segment, Button, Label, Icon, Accordion, Message } from "semantic-ui-react";
import { observer, inject } from "mobx-react";
import NewConnection from "./NewConnection";
import * as datasources from "../datasources";

@inject("store") @observer
export default class DataSourceList extends Component {
  renderConnectionInfo (connection) {
      /*
      <div key={connection.id}>
        <Button>
        </Button>
      </div>;
      */
  }

  makeOnClick = (connection) => (event) => {
    const { store } = this.props;
    event.preventDefault();

    store.datasource.selectConnection(connection.id);
  }

  renderConnectionPanels (connections) {
    const { store } = this.props;

    return connections.map(connection => {
      const panel = { key: connection.id };
      const datasource = datasources[connection.type];

      if (!datasource) {
        panel.title = connection.type;
        //panel.content = <Message negative>Could not find component for type "{connection.type}"</Message>;
      } else {
        if (!datasource.Label) {
          panel.title = datasource.displayName || connection.type;
        } else {
          panel.title = <datasource.Label params={connection.params} />
        }
        if (!datasource.ConnectionInfo) {
          //panel.content = <Message negative>Could not find component for type "{connection.type}"</Message>;
        } else {
          //panel.content = <datasource.ConnectionInfo disabled params={connection.params} />
        }
      }

      if (store.datasource.selected && store.datasource.selected.id === connection.id) {
        panel.primary = true;
      }

      const { title, ...props} = panel;

      return <Segment basic>
        <Button {...props} fluid onClick={this.makeOnClick(connection)}>{title}</Button>
      </Segment>;
    });
  }

  render () {
    const { store } = this.props;
    return (
      <div>
        { store.datasource.connections.length > 0 &&
          <Segment.Group vertical>
            {this.renderConnectionPanels(store.datasource.connections)}
          </Segment.Group>
        }
        <Segment vertical>
          <NewConnection />
        </Segment>
      </div>
    );
  }
}
