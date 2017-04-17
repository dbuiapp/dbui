const sqlite = require('sqlite');
const { connections } = require("../../backend");

module.exports = async function addConnection (params) {
  const { path } = params;
  return sqlite.open(path);
}
