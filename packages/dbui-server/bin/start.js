#!/usr/bin/env node
const server = require('../');
const configPath = process.argv[2] || 'config.ini';
server.start(configPath).then(({ server }) => {
  const { address, port } = server.address();
  console.log(`Listening on ${address}:${port}`);
}).catch(console.error);
