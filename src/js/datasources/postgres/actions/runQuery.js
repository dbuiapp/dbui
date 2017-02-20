import { createRequest } from '../../../backend';
import { updateConnection } from '../../../modules/connections/actions';


export default async function runQuery(store, payload) {
  const { query, id } = payload;
  const response = await createRequest('connection', payload);
  const { connections } = store.getState();
  const updatedConnection = connections.existingConnections.filter(conn => conn.id === id)[0];

  if (!updatedConnection) {
    throw new Error('Could not find connection');
  }

  updatedConnection.queries = (updatedConnection.queries || []).concat([
    {
      query,
      results: response,
    },
  ]);

  store.dispatch(updateConnection(updatedConnection));

  return response;
}
