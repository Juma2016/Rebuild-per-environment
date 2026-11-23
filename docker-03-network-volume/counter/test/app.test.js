const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { createServer } = require('../app');

async function start(directory) {
  const server = createServer(directory);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise(resolve => server.close(resolve)) };
}
test('increments survive a new server instance using the same directory', async t => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'contdel-counter-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  let s = await start(directory);
  try {
    assert.equal((await (await fetch(s.url)).json()).count, 1);
    assert.equal((await fetch(s.url + '/health')).status, 200);
    assert.equal((await (await fetch(s.url)).json()).count, 2);
  } finally { await s.close(); }
  s = await start(directory);
  try { assert.equal((await (await fetch(s.url)).json()).count, 3); }
  finally { await s.close(); }
});
test('invalid stored data is reported instead of silently resetting it', t => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'contdel-counter-'));
  t.after(() => fs.rmSync(directory, { recursive: true, force: true }));
  fs.writeFileSync(path.join(directory, 'count.txt'), 'broken');
  assert.throws(() => createServer(directory), /Invalid counter data/);
});
