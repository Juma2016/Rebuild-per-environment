const http = require('node:http');

function createServer(counterUrl = process.env.COUNTER_URL || 'http://counter:3000') {
  return http.createServer(async (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    if (request.url === '/health') {
      response.end(JSON.stringify({ status: 'ok' }));
    } else if (request.url === '/') {
      try {
        const upstream = await fetch(counterUrl, { signal: AbortSignal.timeout(2000) });
        if (!upstream.ok) throw new Error('Counter request failed');
        const data = await upstream.json();
        response.end(JSON.stringify({ service: 'web', count: data.count }));
      } catch {
        response.writeHead(503);
        response.end(JSON.stringify({ error: 'Counter unavailable' }));
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
