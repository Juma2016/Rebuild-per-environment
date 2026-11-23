const http = require('node:http');

function createServer(message = process.env.MESSAGE || 'Hello Container') {
    return http.createServer((request, response) => {
    console.log(JSON.stringify({ method: request.method, path: request.url }));
    if (request.url === '/health') {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ status: 'ok' }));
    } else if (request.url === '/') {
      response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end(`${message}\n`);
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
  });
}

if (require.main === module) {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  const server = createServer().listen(port, '0.0.0.0');
  process.on('SIGTERM', () => server.close(() => process.exit(0)));
}
module.exports = { createServer };
