const { package, expect, describe, it, beforeEach } = require('../helpers');

const { ConnectionFactory, Connection } = package.connections;

describe('ConnectionFactory', () => {
  let factory;
  beforeEach(() => {
    factory = new ConnectionFactory();
  })
  it('should throw on an unrecognized type', async () => {
    const type = 'objectzzz';
    const fn = async () => {
      return factory.createConnection(type);
    };
    expect(fn()).to.be.rejectedWith(`Unrecognized connection type "${type}"`);
  });

  it('should return an instance of Connection', async () => {
    const type = 'object';
    const connection = await factory.createConnection(type);
    expect(connection).to.be.an.instanceOf(Connection);
  });
});