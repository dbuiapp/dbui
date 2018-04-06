const { package, expect, describe, it, beforeEach } = require('../helpers');

const { ConnectionRepository, Connection } = package.connections;

describe('ConnectionRepository', () => {
  let repo;
  beforeEach(() => {
    repo = new ConnectionRepository();
  });

  describe('createConnection', () => {
    it('should reject on an unrecognized type', async () => {
      const type = 'objectzzz';
      expect(repo.createConnection(type)).to.be.rejectedWith(`Unrecognized connection type "${type}"`);
    });

    it('should return an id', async () => {
      const type = 'object';
      const id = await repo.createConnection(type);
      expect(id).to.be.a('string');
      expect(id).to.match(/[a-z0-9]{12,24}/);
    });
  });

  describe('getConnection', () => {
    let connectionId;
    beforeEach(async () => {
      const type = 'object';
      connectionId = await repo.createConnection(type);
    });
    it('should return a connection', async () => {
      const connection = repo.getConnection(connectionId);
      expect(connection).to.be.an.instanceOf(Connection);
    });
    it('should throw if id is not used', async () => {
      const type = 'object';
      expect(() => repo.getConnection('alsdfj')).to.throw('Connection not found');
    });
  });

  describe('removeConnection', () => {
    let connectionId;
    beforeEach(async () => {
      const type = 'object';
      connectionId = await repo.createConnection(type);
    });
    it('should delete if exists', async () => {
      const type = 'object';
      const id = await repo.createConnection(type);

      await repo.removeConnection(id);
    });


    it('should throw if id does not exist', async () => {
      const type = 'object';
      const id = await repo.createConnection(type);

      expect(repo.removeConnection(id + 'zz')).to.be.rejectedWith('Connection not found');

    });
  });
});