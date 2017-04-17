import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import { inject, observer } from "mobx-react";
import Tab from "../../../../components/common/Tab";
import { QueryPane, SchemaPane, VisualizePane } from "../../../common/frontend/panes";

@inject("store") @observer
export default class Connection extends Component {

  render () {
    const { params } = this.props;
    return (
      <div>
        <h1>SQLite</h1>
        <p>{params.path}</p>

        <Tab fluid>
          <Tab.Pane name="Query">
            <QueryPane />
          </Tab.Pane>
          <Tab.Pane name="Schema">
            <SchemaPane />
          </Tab.Pane>
          <Tab.Pane name="Visualize">
            <VisualizePane />
          </Tab.Pane>
        </Tab>
      </div>
    );
  }
}
