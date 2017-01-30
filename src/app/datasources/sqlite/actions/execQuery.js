import { registry } from '../../../datasources';

export default async function ({ id, query }) {
  const connectionInfo = registry.getConnection(id);

  return await connectionInfo.connection.run(query);
}
