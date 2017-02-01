import * as datasources from '../../datasources';
import { getConnection } from '../../datasources/registry';

export default async function ({ action, ...payload }) {
  const conn = getConnection(payload.id);
  const { type } = conn;
  const datasource = datasources[type];
  if (!datasource) {
    throw new Error(`Unknown type "${type}"`);
  }
  const actionHandler = datasource.actions[action];
  if (!actionHandler) {
    throw new Error(`Unknown action "${action}"`);
  }
  const response = await actionHandler(payload);
  return response;
}
