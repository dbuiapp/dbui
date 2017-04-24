const sqlite = require("sqlite");

module.exports = async function query (connection, params) {
  const { query } = params;
  if (!connection) {
    throw new Error('Connection not found');
  }
  const result = await connection.connection.all(query);
  return result;
}
