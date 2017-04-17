const uuid = require("uuid");

const connections = {};

exports.add = function add (connection) {
  const id = uuid();
  connections[id] = connection;
  return id;
};

exports.remove = function remove (connectionId) {
  delete connections[connectionId];
};

exports.get = function get (connectionId) {
  return connections[connectionId];
}
