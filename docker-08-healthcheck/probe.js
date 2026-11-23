async function probe(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(1500) });
    console.log('Probe HTTP status: ' + response.status);
    await response.body?.cancel();
    return response.ok ? 0 : 1;
  } catch (error) {
    console.error('Probe failed: ' + error.name);
    return 1;
  }
}
if (require.main === module) {
  probe(process.argv[2] || 'http://127.0.0.1:3000/health/live')
    .then(code => { process.exitCode = code; });
}
module.exports = { probe };
