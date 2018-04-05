class Connection {
  constructor (options = {}) {
    this.options = options;
    this.setActions();
  }

  setActions (actions) {
    throw new Error('Not implemented');
  }

  async connect () {
    throw new Error('Not implemented');
  }

  async disconnect () {
    throw new Error('Not implemented');
  }

  async exec (action, payload) {
    if (!(action in this.actions)) {
      throw new Error('Not implemented');
    }
    return this.actions[action](this.connection, payload);
  }
}

module.exports = Connection;