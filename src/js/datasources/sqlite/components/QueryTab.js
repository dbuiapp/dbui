import React, { Component } from 'react';
import { connect } from 'react-redux';

export class QueryTab extends Component {

  render () {
    const { connection } = this.props;

    return (
      <div>
        Query!
      </div>
    );
  }
}

export default connect()(QueryTab);
