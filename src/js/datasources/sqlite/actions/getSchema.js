import { createRequest } from '../../../backend';
import { updateConnection } from '../../../modules/connections/actions';


export default async function getSchema(store, payload) {
  const { query, id } = payload;
  const response = await createRequest('connection', payload);
  const { connections } = store.getState();
  const updatedConnection = connections.existingConnections.filter(conn => conn.id == id)[0];

  if (!updatedConnection) {
    throw new Error('Could not find connection');
  }
  console.log('schema', response);
  updatedConnection.schema = response;

  store.dispatch(updateConnection(updatedConnection));

  return response;
}
