import pg from 'pg-promise-strict';
import uuid from 'uuid/v1';
import { registry } from '../../../datasources';

const type = 'postgres';

export default async function ({ host: hostname, username: user, password, database, ...rest }) {
  const [host, port = 5432] = hostname.split(':');

  const connection = await pg.connect({host, port, user, password, database});
  const id = uuid();

  const connectionInfo = { id, type, connection };
  await registry.addConnection(connectionInfo);

  return { id, host, database, type };
}
