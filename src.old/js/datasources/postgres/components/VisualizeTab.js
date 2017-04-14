import React, { Component } from 'react';
import { connect } from 'react-redux';
import { connectionAction } from '../../../modules/connections/actions';
import Visualization from './Visualization';
import VisualizationChooser from './VisualizationChooser';

export class VisualizeTab extends Component {

  onSubmit = (event) => {
    event.preventDefault();

    const { dispatch, connection: { id, type } } = this.props;
    const action = 'visualize';
    const form = event.target;
    const query = form.query.value;

    dispatch(connectionAction({ id, type, action, query }));
  }

  render() {
    const { connection } = this.props;
    return (
      <div className="visualize">
        <VisualizationChooser connection={connection} />
        <ul className="no-bullet">
          {(connection.visualizations || []).map((visualization, index) => (
            <li key={index}>
              {React.createElement(Visualization, { visualization, connection, index })}
            </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default connect()(VisualizeTab);
