const { package, expect, describe, it, beforeEach } = require('../helpers');

const { ConnectionRepository, Connection } = package.connections;

describe('ConnectionRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new ConnectionRepository();
  });

  it('should reject on an unrecognized type', async () => {
    const type = 'objectzzz';
    expect(repo.createConnection(type)).to.be.rejectedWith(`Unrecognized connection type "${type}"`);
  });

  it('should return an id', async () => {
    const type = 'object';
    const id = await repo.createConnection(type);
    expect(id).to.be.a('string');
    const connection = repo.getConnection(id);
    expect(connection).to.be.an.instanceOf(Connection);
  });

  it('should throw if id is not used', async () => {
    const type = 'object';
    expect(() => repo.getConnection('alsdfj')).to.throw('Connection not found');
  });
});