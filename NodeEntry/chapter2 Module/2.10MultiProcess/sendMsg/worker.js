// 子进程接收父进程信息
var begin = process.argv[2];
console.log('I am worker ' + begin);
process.on('message', (msg) => {
  console.log('from parent ', msg);
  process.exit();
});
process.send({ hello: 'parent' });