import { registry } from '../../';

export default async function ({ id, query }) {
  const connectionInfo = registry.getConnection(id);

  const response = await connectionInfo.connection.query(query);
  return response;
}
