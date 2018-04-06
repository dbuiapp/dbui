const ConnectionFactory = require('./ConnectionFactory');

class ConnectionRepository {
  constructor () {
    this.factory = new ConnectionFactory();
    this.connections = {};
  }

  generateId () {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }

  async createConnection (type, config) {
    const id = this.generateId();
    const connection = await this.factory.createConnection(type, config);
    this.connections[id] = connection;
    return id;
  }

  getConnection (id) {
    if (!this.connections[id]) {
      throw new Error('Connection not found');
    }

    return this.connections[id];
  }

  async removeConnection (id) {
    if (!this.connections[id]) {
      throw new Error('Connection not found');
    }
    await this.connections[id].disconnect();
    this.connections[id] = null;
  }
}

module.exports = ConnectionRepository;