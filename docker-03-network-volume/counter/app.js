const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

function createServer(dataDirectory = process.env.DATA_DIR || '/data') {
  fs.mkdirSync(dataDirectory, { recursive: true });
  const file = path.join(dataDirectory, 'count.txt');
  let count = 0;
  try {
    count = Number(fs.readFileSync(file, 'utf8'));
    if (!Number.isSafeInteger(count) || count < 0) throw new Error('Invalid counter data');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return http.createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.url === '/health') {
      response.end(JSON.stringify({ status: 'ok' }));
    } else if (request.url === '/') {
      const next = count + 1;
      try {
        fs.writeFileSync(file, String(next));
        count = next;
        response.end(JSON.stringify({ count }));
      } catch {
        response.writeHead(500);
        response.end(JSON.stringify({ error: 'Counter could not be stored' }));
      }
    } else {
      response.writeHead(404);
      response.end(JSON.stringify({ error: 'Not found' }));
    }
  });
}

if (require.main === module) {
  const server = createServer().listen(3000, '0.0.0.0');
  process.on('SIGTERM', () => server.close(() => process.exit(0)));
}
module.exports = { createServer };
