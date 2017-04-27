const datasources = require("datasources/backend");
const { connections } = require("../");

module.exports = async function connection (args) {
  const { id, action, params } = args;
  if (!id) {
    throw new Error("Could not execute action");
  }
  const connection = connections.get(id);
  if (!id) {
    throw new Error('Connection not found');
  }
  const response = await datasources[connection.type][action](connection, params);
  return response;
}
