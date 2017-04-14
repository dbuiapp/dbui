import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRequest, name as backendName } from '../../../backend';
import { NotificationList } from '../../../components/common';
import { shortenPath } from '../../../util';

export class DatasourceConfig extends Component {

  render() {
    return (
      <div>
        <div className="postgres config">
          <input type="text" name="host" placeholder="Host:Port" />
          <input type="text" name="username" placeholder="Username" />
          <input type="text" name="password" placeholder="Password" />
          <input type="text" name="database" placeholder="Database" />
        </div>
        <input type="submit" className="button small expanded" value="Connect" />
      </div>
    );
  }
}

export default connect()(DatasourceConfig);
