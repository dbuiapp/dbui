const fs = require('mz/fs');
const url = require('url');
const http = require('http');
const formidable = require('formidable')
const toml = require('toml');
const { connections: { ConnectionRepository } } = require('@dbui/backend');

function formidablePromise (req, opts) {
  return new Promise(function (resolve, reject) {
    var form = new formidable.IncomingForm(opts)
    form.parse(req, function (err, fields, files) {
      if (err) return reject(err)
      resolve({ fields: fields, files: files })
    });
  });
}

function detectValidOrigin (originRegexs, clientOrigin) {
  if (!clientOrigin) {
    return true;
  }
  const originUrl = url.parse(clientOrigin);

  const host = originUrl.host;
  return originRegexs.some(originRegex => {
    return originRegex.test(host);
  })
}

async function start (configPath, cb) {
  try {
    const fileContents = await fs.readFile(configPath, 'utf8');
    const config = toml.parse(fileContents) || {};
    return startWithConfig(config, cb);
  } catch (err) {
    cb(err);
  }
}

async function startWithConfig (config, cb) {
  const validOrigins = ((config.cors && config.cors.origins) || ['*'])
    .map(origin => {
      const regex = origin.replace(/\./g, '\\.').replace(/\*/g, '\\w*');
      return new RegExp(regex);
    });

  const repo = new ConnectionRepository();

  const server = http.createServer(async (req, res) => {
    try {
      const origin = req.headers.origin;
      const isValidOrigin = detectValidOrigin(validOrigins, origin);
      if (!isValidOrigin) {
        throw new Error('Invalid Origin');
      }
      if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
      }
      const [ action, connectionId ] = req.url.slice(1).split('/');

      const { fields: payload } = await formidablePromise(req);

      // create new connection
      if (req.method === 'POST') {
        const type = action;
        const id = await repo.createConnection(type, payload);
        return res.end(id);
      } else if (req.method === 'DELETE') {
        const id = action;
        await repo.removeConnection(id);
        res.end();
      } else if (req.method === 'PUT') {
        const connection = repo.getConnection(connectionId);
        const response = await connection.exec(action, payload);
        res.end(JSON.stringify(response));
      } else if (req.method === 'OPTIONS') {
        res.end();
      } else {
        throw new Error('Unhandled method');
      }
    } catch (err) {
      console.error(err);
      res.statusCode = 500;
      res.end(JSON.stringify({
        error: err.message
      }));
    }
  });

  return new Promise((resolve, reject) => {
    server.listen(config.server.port, config.server.host, (err) => err ? reject(err) : resolve(server));
  });
}

module.exports = start;
module.exports.start = start;
module.exports.startWithConfig = startWithConfig;