const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const { createServer } = require('../app');
const { probe } = require('../probe');

async function withApp(options, action) {
  const server = createServer(options).listen(0, '127.0.0.1');
  await once(server, 'listening');
  try { return await action('http://127.0.0.1:' + server.address().port); }
  finally { await new Promise(resolve => server.close(resolve)); }
}
test('initializing application is live but not ready', async () => {
  await withApp({ getMode: () => 'ok', now: () => 1000, startedAt: 0 }, async base => {
    assert.equal((await fetch(base + '/health/live')).status, 200);
    const ready = await fetch(base + '/health/ready');
    assert.equal(ready.status, 503);
    assert.equal((await ready.json()).reason, 'initializing');
  });
});
test('dependency failure affects readiness without failing local liveness', async () => {
  await withApp({ getMode: () => 'ready-fail', startupDelayMs: 0 }, async base => {
    assert.equal((await fetch(base + '/health/live')).status, 200);
    assert.equal((await fetch(base + '/health/ready')).status, 503);
  });
});
test('local failure fails both endpoints while the server stays reachable', async () => {
  await withApp({ getMode: () => 'live-fail', startupDelayMs: 0 }, async base => {
    assert.equal((await fetch(base + '/health/live')).status, 503);
    assert.equal((await fetch(base + '/health/ready')).status, 503);
    assert.equal((await fetch(base + '/')).status, 200);
  });
});
test('green health can coexist with an incorrect business result', async () => {
  await withApp({ getMode: () => 'wrong-result', startupDelayMs: 0 }, async base => {
    assert.equal((await fetch(base + '/health/ready')).status, 200);
    assert.notEqual((await (await fetch(base + '/')).json()).message, 'Hello Healthcheck');
  });
});
test('probe maps HTTP responses to success and failure exit codes', async () => {
  let mode = 'ok';
  await withApp({ getMode: () => mode, startupDelayMs: 0 }, async base => {
    assert.equal(await probe(base + '/health/ready'), 0);
    mode = 'ready-fail';
    assert.equal(await probe(base + '/health/ready'), 1);
    assert.equal(await probe(base + '/missing'), 1);
  });
});
test('application can recover without replacing or restarting the server', async () => {
  let mode = 'live-fail';
  await withApp({ getMode: () => mode, startupDelayMs: 0 }, async base => {
    assert.equal((await fetch(base + '/health/ready')).status, 503);
    mode = 'ok';
    assert.equal((await fetch(base + '/health/ready')).status, 200);
    assert.equal((await (await fetch(base + '/')).json()).message, 'Hello Healthcheck');
  });
});
