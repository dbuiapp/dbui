import { registry } from '../../../datasources';

export default async function ({ id }) {
  const connectionInfo = registry.getConnection(id);

  await connectionInfo.connection.destroy();
  registry.removeConnection(connectionInfo);
}
