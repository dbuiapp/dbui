import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createRequest, name as backendName } from '../../../backend';
import { NotificationList } from '../../../components/common';

export class DatasourceConfig extends Component {

  state = { currentPath: null };

  showDialog = async (event) => {
    if (this.debounce) {
      return;
    }
    this.debounce = true;
    try {
      // TODO: move this to redux
      const response = await createRequest('createFileDialog', {
        type: event.target.getAttribute('data-type'),
        title: 'Select Database Path',
        buttonLabel: 'OK',
      });
      this.debounce = false;
      this.setState({ currentPath: response });
    } catch (err) {
      this.debounce = false;
    }
  }

  getPathSelector() {
    const { currentPath } = this.state;
    return (
      <div className="sqlite config">
        <input ref="hiddenpath" type="hidden" name="path" value={currentPath || ''} />
        <a className="button small expanded" data-type="save" onClick={this.showDialog}>
          New Path
        </a>
        <a className="button small expanded" data-type="open" onClick={this.showDialog}>
          Existing Path
        </a>
      </div>
    );
  }

  render() {
    const { currentPath } = this.state;

    return (
      <div>
        <div>
          {
            (backendName == 'electron-ipc') ?
              this.getPathSelector() :
              <input name="path" className="small expand" type="text" placeholder="Path" />
          }
          {currentPath || ''}
        </div>
        <input type="submit" disabled={!currentPath} className="button small expanded" value="Connect" />
      </div>
    );
  }
}

export default connect()(DatasourceConfig);
