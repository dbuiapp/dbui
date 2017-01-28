import { registry } from '../../';

export default async function ({ id, query }) {
  const connectionInfo = registry.getConnection(id);

  return await connectionInfo.connection.all(query);
}
