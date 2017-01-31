import { registry } from '../../../datasources';

export default async function ({ id, query }) {
  const connectionInfo = registry.getConnection(id);
  const result = await connectionInfo.connection.all('SELECT * FROM sqlite_master');
  console.log(result)
  return result;
}
