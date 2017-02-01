import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TabView, Tab } from '../../../components/common';
import { name } from '../';
import { QueryTab, SchemaTab, VisualizeTab } from './';

export class ConnectionView extends Component {

  render() {
    const { connection } = this.props;

    return (
      <div className="mysql view">
        <div className="row">
          <div className="columns small-6">{name}</div>
          <div className="text-right columns small-6">{connection.host}/{connection.database}</div>
        </div>
        <TabView defaultTab="query">
          <Tab label="Query" tabId="query">
            <QueryTab connection={connection} />
          </Tab>
          {/* //wait until schema tab is done
          <Tab label="Schema" tabId="schema">
            <SchemaTab connection={connection} />
          </Tab>
          */}
          <Tab label="Visualize" tabId="visualize">
            <VisualizeTab connection={connection} />
          </Tab>
        </TabView>
      </div>
    );
  }
}

export default connect()(ConnectionView);
