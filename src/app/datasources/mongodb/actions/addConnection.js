import mongodb from 'mongodb';
import uuid from 'uuid/v1';
import { registry } from '../../../datasources';

const type = 'mongodb';

export default async function ({ host: hostname, username: user, password, database }) {
  const [host, port = 3306] = hostname.split(':');

  const connection = await mongodb.connect({ host, port, user, password, database });
  const id = uuid();

  const connectionInfo = { id, type, connection };
  await registry.addConnection(connectionInfo);

  return { id, host: hostname, username: user, password, database, type };
}
