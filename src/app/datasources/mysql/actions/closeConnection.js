import { registry } from '../../../datasources';

const type = 'mysql';

export default async function ({ id }) {
  const connectionInfo = registry.getConnection(id);

  await connectionInfo.connection.close();
  registry.removeConnection(connectionInfo);
}
