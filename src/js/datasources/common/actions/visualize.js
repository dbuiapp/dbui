import { createRequest } from '../../../backend';
import { updateConnection } from '../../../modules/connections/actions';
import visualizations from '../visualizations';

export default async function visualize(store, payload) {
  const { params, visType, id } = payload;
  const visualization = visualizations[visType];
  if (!visualization) {
    throw new Error('Visualization type not recognized');
  }
  const query = visualization.transform(params);
  const response = await createRequest('connection', { id, query, action: 'runQuery' });
  const { connections } = store.getState();
  const updatedConnection = connections.existingConnections.filter(conn => conn.id === id)[0];

  if (!updatedConnection) {
    throw new Error('Could not find connection');
  }

  updatedConnection.visualizations = (updatedConnection.visualizations || []).concat([
    {
      query,
      visType,
      params,
      results: response,
    },
  ]);

  store.dispatch(updateConnection(updatedConnection));

  return response;
}
