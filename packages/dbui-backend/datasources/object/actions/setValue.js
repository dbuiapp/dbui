module.exports = async (connection, { key, value }) => {
  connection.data[key] = value;
};