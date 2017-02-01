import { registry } from '../../../datasources';

export default async function ({ id, query }) {
  const connectionInfo = registry.getConnection(id);
  const result = await connectionInfo.connection.query('SELECT * FROM information_schema');
  return result;
}
