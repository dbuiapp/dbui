const actions = require('./actions');
const { Connection } = require('../../connections');

class ObjectConnection extends Connection {
  setActions (_actions) {
    this.actions = _actions || actions;
  }

  async connect () {
    const initialValue = this.options.initialValue || {};
    this.connection = { data: initialValue };
  }

  async disconnect () {
    this.connection = null;
  }
}

module.exports = ObjectConnection;