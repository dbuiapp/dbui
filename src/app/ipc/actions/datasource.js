import * as datasources from '../../datasources';

export default async function ({ action, type, payload }) {
  const datasource = datasources[type];
  const response = await (datasource.actions[action])(payload);

  return response;
}
