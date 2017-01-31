import { createRequest } from '../../../backend';
import { updateConnection } from '../../../modules/connections/actions';


export default async function visualize(store, payload) {
  const { query, id } = payload;
  const response = await createRequest('connection', { id, query, action: 'runQuery' });
  const { connections } = store.getState();
  const updatedConnection = connections.existingConnections.filter(conn => conn.id == id)[0];

  if (!updatedConnection) {
    throw new Error('Could not find connection');
  }

  updatedConnection.visualizations = (updatedConnection.visualizations || []).concat([
    {
      query,
      results: response,
    },
  ]);

  store.dispatch(updateConnection(updatedConnection));

  return response;
}
