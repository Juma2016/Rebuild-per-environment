const fs = require('node:fs');
const statePath = '/tmp/contdel-health-state.json';
const modes = ['ok', 'ready-fail', 'live-fail', 'wrong-result', 'exit'];
function readMode() {
  try { return JSON.parse(fs.readFileSync(statePath, 'utf8')).mode; }
  catch (error) {
    if (error.code === 'ENOENT') return 'ok';
    throw error;
  }
}
if (require.main === module) {
  const mode = process.argv[2];
  if (!modes.includes(mode)) {
    console.error('Choose: ' + modes.join(', '));
    process.exitCode = 1;
  } else {
    fs.writeFileSync(statePath + '.new', JSON.stringify({ mode }));
    fs.renameSync(statePath + '.new', statePath);
    console.log('Application mode: ' + mode);
  }
}
module.exports = { statePath, readMode };
