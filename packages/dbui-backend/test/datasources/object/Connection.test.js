const { package, expect, describe, it, beforeEach } = require('../../helpers');

const { ConnectionFactory, Connection } = package.connections;

describe('ObjectConnection', () => {
  let factory;
  beforeEach(() => {
    factory = new ConnectionFactory();
  })
  it('should be initialized with an empty object', async () => {
    const type = 'object';
    const connection = await factory.createConnection(type);
    expect(connection).to.be.an.instanceOf(Connection);
    expect(connection.connection.data).to.deep.equal({});
  });

  it('should be able to initialize the data', async () => {
    const type = 'object';
    const initialValue = { a: 1, b: '2' };
    const connection = await factory.createConnection(type, { initialValue });
    expect(connection.connection.data).to.deep.equal({ a: 1, b: '2' });
  });

  describe('actions', () => {
    let connection;

    beforeEach(async () => {
      const initialValue = { a: 1, b: '2' };
      connection = await factory.createConnection('object', { initialValue });
    });

    it('getObject', async () => {
      const value = await connection.exec('getObject');
      expect(value).to.deep.equal({ a: 1, b: '2' });
    });

    it('getValue', async () => {
      const aValue = await connection.exec('getValue', 'a');
      const bValue = await connection.exec('getValue', 'b');
      expect(aValue).to.equal(1);
      expect(bValue).to.equal('2');
    });

    it('setValue', async () => {
      await connection.exec('setValue', { key: 'c', value: 'zxcvbn' });
      const aValue = await connection.exec('getValue', 'a');
      const bValue = await connection.exec('getValue', 'b');
      const cValue = await connection.exec('getValue', 'c');
      expect(aValue).to.equal(1);
      expect(bValue).to.equal('2');
      expect(cValue).to.equal('zxcvbn');
    });
  });
});