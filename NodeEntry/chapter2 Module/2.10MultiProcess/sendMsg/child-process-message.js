// 进程间通信
var child_process = require('child_process');
var worker = child_process.fork('worker.js', ['args1']);
worker.on('exit', () => {
  console.log('child process exit');
});
worker.send({ hello: 'child' });
worker.on('message', (msg) => {
  console.log('from child', msg);
});
