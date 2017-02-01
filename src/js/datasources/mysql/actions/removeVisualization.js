import { createRequest } from '../../../backend';
import { updateConnection } from '../../../modules/connections/actions';


export default async function removeVisualization(store, payload) {
  console.log(store, payload);
  const { query, id, index } = payload;
  const { connections } = store.getState();
  const updatedConnection = connections.existingConnections.filter(conn => conn.id == id)[0];

  if (!updatedConnection) {
    throw new Error('Could not find connection');
  }

  (updatedConnection.visualizations || []).splice(index, 1);

  store.dispatch(updateConnection(updatedConnection));
}
