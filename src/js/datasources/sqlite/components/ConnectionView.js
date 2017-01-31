import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabView, Tab } from '../../../components/common';
import { name } from '../';
import { QueryTab, SchemaTab, VisualizeTab } from './';

export class ConnectionView extends Component {

  render() {
    const { connection } = this.props;

    return (
      <div className="sqlite view">
        <div className="row">
          <div className="columns small-6">{name}</div>
          <div className="text-right columns small-6">{connection.path}</div>
        </div>
        <TabView defaultTab="query">
          <Tab label="Query" tabId="query">
            <QueryTab connection={connection} />
          </Tab>
          <Tab label="Schema" tabId="schema">
            <SchemaTab connection={connection} />
          </Tab>
          <Tab label="Visualize" tabId="visualize">
            <VisualizeTab connection={connection} />
          </Tab>
        </TabView>
      </div>
    );
  }
}

export default connect()(ConnectionView);
