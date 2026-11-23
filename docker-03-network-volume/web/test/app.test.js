const { test } = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const { createServer } = require('../app');

async function start(server, t) {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  return `http://127.0.0.1:${server.address().port}`;
}
test('web returns the value from the counter', async t => {
  const upstream = await start(http.createServer((req, res) => res.end('{"count":7}')), t);
  const url = await start(createServer(upstream), t);
  assert.deepEqual(await (await fetch(url)).json(), { service: 'web', count: 7 });
});
test('an unavailable dependency returns 503 while local health stays 200', async t => {
  const upstream = await start(http.createServer((req, res) => { res.writeHead(503); res.end(); }), t);
  const url = await start(createServer(upstream), t);
  assert.equal((await fetch(url)).status, 503);
  assert.equal((await fetch(url + '/health')).status, 200);
});
test('unknown routes return 404', async t => {
  const url = await start(createServer(), t);
  assert.equal((await fetch(url + '/missing')).status, 404);
});
