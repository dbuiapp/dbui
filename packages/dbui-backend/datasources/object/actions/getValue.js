module.exports = async (connection, payload) => {
  return connection.data[payload];
};