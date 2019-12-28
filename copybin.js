const { spawn } = require('child_process');
const dir = spawn('docker', [
  'run',
  '--rm',
  '-v',
  `${__dirname}/dist:/mnt/dist`,
  'astyle-wasm',
  'bash',
  '-c',
  'rm /mnt/dist/* && cp bin/* /mnt/dist'
]);

dir.stdout.pipe(process.stdout);
dir.stderr.pipe(process.stderr);
dir.on('close', code => process.exit(code));
