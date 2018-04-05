const { package, expect, describe, it } = require('../helpers');

const { Connection } = package.connections;

class BlankConnection extends Connection {
}
class DummyConnection extends Connection {
  setActions () {

  }
}

describe('Connection',  () => {
  describe('constructor',  () => {
    it('should initialize options to empty object', async () => {
      const conn = new DummyConnection();

      expect(conn.options).to.deep.equal({});
    });
  });

  describe('setActions',  () => {
    it('should throw when method is not implemented', async () => {
      const conn = Object.create(BlankConnection.prototype);
      expect(() => conn.setActions()).to.throw('Not implemented');
    });
  });

  describe('connect',  () => {
    it('should reject when method is not implemented', async () => {
      const conn = new DummyConnection();
      expect(conn.connect()).to.be.rejectedWith('Not implemented'); 
    });
  });

  describe('disconnect',  () => {
    it('should reject when method is not implemented', async () => {
      const conn = new DummyConnection();
      expect(conn.disconnect()).to.be.rejectedWith('Not implemented'); 
    });
  });

  describe('exec',  () => {
    it('should reject when action is not implemented', async () => {
      const conn = new DummyConnection();
      expect(conn.connect()).to.be.rejectedWith('Not implemented'); 
    });
  });
});