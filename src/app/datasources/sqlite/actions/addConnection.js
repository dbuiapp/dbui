import sqlite from 'sqlite';
import uuid from 'uuid/v1';
import { registry } from '../../';

export default async function ({ path, ...rest }) {
  const connection = await sqlite.open(path);
  const id = uuid();

  const connectionInfo = { id, connection };

  await registry.addConnection(connectionInfo);

  return { id, path, type: 'sqlite' };
}
