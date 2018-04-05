const { describe, it, beforeEach, package } = require('./helpers');
const axios = require('axios');

describe('server', () => {
  let server;
  beforeEach(async () => {
    server = await package.startWithConfig({ server: { port: POST }});
  });
  it('should give an error for non-POST,DELETE,PUT,OPTIONS methods', async () => {


  });
});