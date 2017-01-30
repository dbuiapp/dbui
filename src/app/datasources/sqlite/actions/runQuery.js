import { registry } from '../../../datasources';

export default async function ({ id, query }) {
  const connectionInfo = registry.getConnection(id);

  const result = await connectionInfo.connection.all(query);
  console.log(result);
  return result;
}
