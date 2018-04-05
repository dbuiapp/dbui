const datasources = require('../datasources');

class ConnectionFactory {
  async createConnection (type, options) {
    if (type in datasources) {
      const connection = new datasources[type].Connection(options);
      await connection.connect()
      return connection;
    }
    throw new Error(`Unrecognized connection type "${type}"`);
  }
}

module.exports = ConnectionFactory;