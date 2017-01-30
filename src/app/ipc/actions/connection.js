import * as datasources from '../../datasources';
import { getConnection } from '../../datasources/registry';

export default async function ({ action, ...payload }) {
  const conn = getConnection(payload.id);
  const { type } = conn;
  try {
    const datasource = datasources[type];
    if (!datasource) {
      throw new Error(`Unknown type "${type}"`);
    }
    const actionHandler = datasource.actions[action];
    if (!actionHandler) {
      throw new Error(`Unknown action "${action}"`);
    }
    return await actionHandler(payload);
  } catch (err) {
    console.error(err);
  }
}
