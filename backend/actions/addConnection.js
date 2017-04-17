const datasources = require("../../src/datasources/backend");
const { connections } = require("../");
const deepEqual = require("deep-equal");

module.exports = async function addConnection (args) {
  const { type, params, id } = args;
  if (id) {
    const connection = connections.get(id);
    if (
      connection.type === type &&
      deepEqual(params, connection.params)
    ) {
      return { connectionId: id };
    }
  }
  const datasource = datasources[type];
  if (!datasource) {
    throw new Error(`Datasource not found: ${type}`);
  }
  if (!datasource.addConnection) {
    throw new Error(`Datasource does not have action: addConnection`);
  }
  const connection = await datasource.addConnection(params);
  const connectionId = connections.add({ type, params, connection });
  return { connectionId };
}
