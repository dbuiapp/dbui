const datasources = require("../../src/datasources/backend");
const { connections } = require("../");

module.exports = async function addConnection (args) {
  console.log(args);
  const { type, params } = args;
  const datasource = datasources[type];
  if (!datasource) {
    throw new Error(`Datasource not found: ${type}`);
  }
  if (!datasource.addConnection) {
    throw new Error(`Datasource does not have action: addConnection`);
  }
  const connection = await datasource.addConnection(params);
  const connectionId = connections.add(connection);
  return { connectionId };
}
