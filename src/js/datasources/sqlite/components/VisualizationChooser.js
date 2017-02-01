import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectionAction } from '../../../modules/connections/actions';
import visualizations from '../visualizations';

const DEFAULT_VISUALIZATION = 'bar';

export class VisualizationChooser extends Component {

  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    const { dispatch, connection: { id, type } } = this.props;
    const { type: visType } = this.state;
    const visualization = visualizations[visType];

    console.log(this.state);

    const form = event.target;
    const action = 'visualize';

    const params = { };

    visualization.fields.forEach((field) => {
      const input = form[field];
      if (input.length) {
        params[field] = Array.from(input).map(input => input.value);
      } else {
        params[field] = input.value;
      }
    });

    console.log(params);

    dispatch(connectionAction({ id, type, action, visType, params }));
  }

  componentWillMount() {
    this.setState({ type: DEFAULT_VISUALIZATION });
  }

  getVisualizationConfig(type) {
    const visualization = visualizations[type];
    if (visualization) {
      return React.createElement(visualization.components.config);
    }
    return null;
  }

  render() {
    const { connection } = this.props;
    const { type } = this.state;
    return (
      <div className="visualization-chooser">
        <form onSubmit={this.onSubmit}>
          <select name="type">
            {Object.entries(visualizations).map(([key, value]) => (
              <option value={key}>{value.name}</option>
              ))};
          </select>
          {this.getVisualizationConfig(type)}
          <input type="submit" value="submit" className="button" />
        </form>
      </div>
    );
  }
}

export default connect()(VisualizationChooser);