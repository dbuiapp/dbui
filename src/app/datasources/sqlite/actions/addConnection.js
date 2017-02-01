import sqlite from 'sqlite';
import uuid from 'uuid/v1';
import { registry } from '../../../datasources';

const type = 'sqlite';

export default async function ({ path, ...rest }) {
  const connection = await sqlite.open(path);
  const id = uuid();

  const connectionInfo = { id, type, connection };
  await registry.addConnection(connectionInfo);

  return { id, path, type };
}
