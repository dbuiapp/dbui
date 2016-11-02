import React, { Component } from 'react';
import { connect } from 'react-redux';
import { name } from '../';

export class ConnectionView extends Component {
  render () {
    const { connection } = this.props;

    return (
      <div>
        <div>{name}</div>
        <div className="connection-description">{connection.path}</div>
        <ul className="tabs">
          <li className="tabs-title is-active"><a href="#panel1" aria-selected="true">Query</a></li>
          <li className="tabs-title"><a href="#panel2">Schema</a></li>
        </ul>
        <div class="tabs-content" data-tabs-content="example-tabs">
          <div class="tabs-panel is-active" id="panel1">
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(ConnectionView);
