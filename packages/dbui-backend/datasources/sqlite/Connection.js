const sqlite = require('sqlite');
const { Connection } = require('../../connections');

class SqliteConnection extends Connection {
  setActions (_actions) {
    this.actions = _actions || actions;
  }
  
  async connect () {
    const db = await sqlite.open(this.options.filename);
    this.connection = db;
  }
}