const sqlite = require("sqlite");

module.exports = async function query (connection, params) {
  if (!connection) {
    throw new Error('Connection not found');
  }
  const meta = {};
  const result = await connection.connection.all("SELECT * FROM sqlite_master");
  if (result) {
    await Promise.all(result.map(async (row) => {
      if (row.type === 'table') {
        meta[row.name] = row;
        meta[row.name].indices = await connection.connection.all(`PRAGMA index_list('${row.name}')`);
        meta[row.name].foreign = await connection.connection.all(`PRAGMA foreign_key_list('${row.name}')`);
      }
    }));
  }
  return meta;
}
