const sqlite = require("sqlite");

module.exports = async function query (connection, params) {
  if (!connection) {
    throw new Error('Connection not found');
  }
  const meta = {};
  const result = await connection.connection.all("SELECT * FROM sqlite_master");
  if (result) {
    await Promise.all(result.map(async (row) => {
      if (row.type === 'table' && row.name != "sqlite_sequence") {
        meta[row.name] = row;
        row.indices = await connection.connection.all(`PRAGMA index_list('${row.name}')`);
        row.foreign = await connection.connection.all(`PRAGMA foreign_key_list('${row.name}')`);
        row.fields = parseFields(row.sql);

        meta[row.name] = row;
      }
    }));
  }
  return meta;
}

const PROPERTIES_REGEX = /(autoincrement|primary key|not null|default \S+)/gi;

// "CREATE TABLE posts (id integer primary key autoincrement, title varchar(255) not null, content text not null, user_id integer not null, FOREIGN KEY(user_id) references users(id))"
function parseFields (sql) {
  const fieldsClause = sql.match(/\((.*)\)/)[1];
  const fieldStatements = fieldsClause.split(/\s*,\s*/g);
  return fieldStatements.reduce((m, clause) => {
    if (clause.match(/^\s*foreign\s+key/i)) {
      return m;
    }

    const [, name, type, props] = clause.match(/(\S+)\s+(\S+)\s*(.*)$/);
    m[name] = { type, properties: props.match(PROPERTIES_REGEX) };
    return m;
  }, {});
}
