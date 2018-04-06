const { describe, it, afterEach, beforeEach, expect, package } = require('./helpers');
const { format: formatUrl } = require('url');
const axios = require('axios');

describe('server', () => {
  let server, repo, url;
  beforeEach(async () => {
    const app = await package.startWithConfig({ cors: { origins: [ "*.example.com" ] } });
    server = app.server;
    repo = app.repo;
    const address = server.address();
    url = formatUrl({ protocol: 'http', hostname: address.address, port: address.port });
  });
  afterEach(async () => {
    server.close();
  });
  it('should give an error for methods except POST,DELETE,PUT,OPTIONS', async () => {
    // yay es6 blocks!
    {
      const response = await axios({url: url, method: 'PATCH' }).catch(err => err.response);
      expect(response.status).to.equal(400);
      expect(response.data).to.deep.equal({ error: 'Unhandled method' });
    }
    {
      const response = await axios({url: url, method: 'GET' }).catch(err => err.response);
      expect(response.status).to.equal(400);
      expect(response.data).to.deep.equal({ error: 'Unhandled method' });
    }
    {
      const response = await axios({url: url, method: 'HEAD' }).catch(err => err.response);
      expect(response.status).to.equal(400);
    }
  });
  describe('POST', async () => {
    it('should throw on unrecognized connection type', async () => {
      const response = await axios({url: `${url}/objectzzz`, method: 'POST' }).catch(err => err.response);
      expect(response.status).to.equal(500);
      expect(response.data).to.deep.equal({ error: "Unrecognized connection type \"objectzzz\"" });
    });
    it('should return a connection id', async () => {
      const response = await axios({url: `${url}/object`, method: 'POST' }).catch(err => err.response);
      expect(response.status).to.equal(201);
      expect(response.data).to.match(/^[a-z0-9]{8,24}$/);

      const connectionId = response.data;

      expect(repo.connections).to.have.key(connectionId);
    });
  });
  describe('PUT', async () => {
    let connectionId;
    beforeEach(async () => {
      const response = await axios({url: `${url}/object`, method: 'POST' }).catch(err => err.response);
      connectionId = response.data;
    })
    it('should throw on unrecognized connection Id', async () => {
      const response = await axios({url: `${url}/abc/getValue`, method: 'PUT' }).catch(err => err.response);
      expect(response.status).to.equal(500);
      expect(response.data).to.deep.equal({ error: "Connection not found" });
    });
    it('should throw on unrecognized action', async () => {
      const response = await axios({url: `${url}/${connectionId}/getValu`, method: 'PUT' }).catch(err => err.response);
      expect(response.status).to.equal(500);
      expect(response.data).to.deep.equal({ error: "Not implemented" });
    });
    it('should call the action', async () => {
      const response = await axios({url: `${url}/${connectionId}/setValue`, method: 'PUT', json: true, body: { a: 1 } }).catch(err => err.response);
      expect(response.status).to.equal(500);
      expect(response.data).to.deep.equal({ error: "Not implemented" });
    });
  });

  describe('DELETE', async () => {
    let connectionId;
    beforeEach(async () => {
      const response = await axios({url: `${url}/object`, method: 'POST' }).catch(err => err.response);
      connectionId = response.data;
    })
    it('should throw on unrecognized connection Id', async () => {
      const response = await axios({url: `${url}/abc`, method: 'DELETE' }).catch(err => err.response);
      expect(response.status).to.equal(500);
      expect(response.data).to.deep.equal({ error: "Connection not found" });
    });
    it('should delete the connection', async () => {
      const response = await axios({url: `${url}/${connectionId}`, method: 'DELETE' }).catch(err => err.response);
      expect(response.status).to.equal(500);
      expect(response.data).to.deep.equal({ error: "Not implemented" });
    });
  });
});