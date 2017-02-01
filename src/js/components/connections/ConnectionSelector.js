import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as datasources from '../../datasources/';
import { addConnection, selectConnection } from '../../modules/connections/actions';
import { setRef } from '../../util';

export class ConnectionSelector extends Component {

  state = { selectedConnection: null };

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetConnectionSelector) {
      this.selector.value = '';
      this.setState({ selectedConnection: null });
    }
  }

  onChange = (event) => {
    this.setState({ selectedConnection: event.target.value });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { dispatch } = this.props;
    const { selectedConnection: type } = this.state;

    const form = event.target;

    const datasource = datasources[type];
    const fields = datasource.fields;
    const settings = fields.reduce((_settings, field) => ({ ..._settings, [field]: form[field].value }), {});

    dispatch(addConnection({ ...settings, type }));
  }

  render() {
    const { selectedConnection } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <select ref={setRef(this, 'selector')} name="type" className="expanded" onChange={this.onChange}>
          <option value="">Data Source</option>
          {Object.entries(datasources).map(([key, value]) => <option key={key} value={key}>{value.name || key}</option>)}
        </select>
        {selectedConnection ? React.createElement(datasources[selectedConnection].components.DatasourceConfig) : null}
      </form>
    );
  }
}

export default connect(state => ({
  resetConnectionSelector: state.connections.resetConnectionSelector,
}))(ConnectionSelector);
