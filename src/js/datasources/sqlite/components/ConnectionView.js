import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabView, Tab } from '../../../components/common';
import { name } from '../';
import { QueryTab } from './';

export class ConnectionView extends Component {

  render() {
    const { connection } = this.props;

    return (
      <div className="sqlite view">
        <div>{name}</div>
        <div className="connection-description">{connection.path}</div>
        <TabView defaultTab="query">
          <Tab label="Query" tabId="query">
            <QueryTab connection={connection} />
          </Tab>
          <Tab label="Schema" tabId="schema">
            Schema
          </Tab>
          <Tab label="Visualize" tabId="visualize">
            Visualize
          </Tab>
        </TabView>
      </div>
    );
  }
}

export default connect()(ConnectionView);
