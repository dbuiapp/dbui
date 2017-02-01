import mysql from 'promise-mysql';
import uuid from 'uuid/v1';
import { registry } from '../../../datasources';

const type = 'mysql';

export default async function ({ host: hostname, username: user, password, database, ...rest }) {
  const [host, port = 3306] = hostname.split(':');

  const connection = await mysql.createConnection({host, port, user, password, database});
  const id = uuid();

  const connectionInfo = { id, type, connection };
  await registry.addConnection(connectionInfo);

  return { id, host, database, type };
}
