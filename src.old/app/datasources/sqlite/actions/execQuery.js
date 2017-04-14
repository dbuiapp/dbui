import { registry } from '../../../datasources';

export default async function ({ id, query }) {
  const connectionInfo = registry.getConnection(id);

  const response = await connectionInfo.connection.run(query);
  return response;
}
