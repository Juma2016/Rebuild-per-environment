const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { createServer } = require('../app');

async function request(path, message) {
  const server = createServer(message).listen(0, '127.0.0.1');
  await once(server, 'listening');
  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}${path}`);
    return { status: response.status, body: await response.text() };
  } finally { await new Promise(resolve => server.close(resolve)); }
}
test('serves the configured greeting', async () => assert.deepEqual(await request('/', 'Classroom'), { status: 200, body: 'Classroom\n' }));
test('reports process health', async () => assert.deepEqual(await request('/health'), { status: 200, body: '{"status":"ok"}' }));
test('unknown paths return 404', async () => assert.equal((await request('/missing')).status, 404));
