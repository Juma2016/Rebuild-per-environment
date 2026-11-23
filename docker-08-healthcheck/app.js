const http = require('node:http');
const fs = require('node:fs');
const { statePath, readMode } = require('./control');

function createServer({ getMode = readMode, now = Date.now, startedAt = now(),
  startupDelayMs = 12000, message = 'Hello Healthcheck' } = {}) {
  return http.createServer((request, response) => {
    const mode = getMode();
    const live = mode !== 'live-fail';
    const initialized = now() - startedAt >= startupDelayMs;
    const ready = live && initialized && mode !== 'ready-fail';
    let status = 200;
    let body;
    if (request.url === '/health/live') {
      status = live ? 200 : 503;
      body = { status: live ? 'ok' : 'failed', scope: 'local application' };
    } else if (request.url === '/health/ready') {
      status = ready ? 200 : 503;
      body = { status: ready ? 'ready' : 'not-ready',
        reason: !live ? 'local failure' : !initialized ? 'initializing' :
          mode === 'ready-fail' ? 'simulated dependency unavailable' : 'ready' };
    } else if (request.url === '/') {
      body = { message: mode === 'wrong-result' ? 'Unexpected greeting' : message };
    } else {
      status = 404;
      body = { error: 'Not found' };
    }
    console.log(JSON.stringify({ method: request.method, path: request.url, status }));
    response.writeHead(status, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(body));
  });
}

if (require.main === module) {
  fs.rmSync(statePath, { force: true });
  const delay = Number(process.env.STARTUP_DELAY_MS || 12000);
  if (!Number.isInteger(delay) || delay < 0) throw new Error('Invalid STARTUP_DELAY_MS');
  const server = createServer({ startupDelayMs: delay }).listen(3000, '0.0.0.0');
  setInterval(() => { if (readMode() === 'exit') process.exit(23); }, 500).unref();
  process.on('SIGTERM', () => server.close(() => process.exit(0)));
}
module.exports = { createServer };
