// TCP 服务端

var net = require('net');
var server = net.createServer((socket) => {
  console.log('client connected');
  socket.on('end', () => {
    console.log('client disconnected');
  });
  socket.write('hello\r\n');
  socket.pipe(socket);
});

server.on('error', (err) => {
  throw err;
});

server.listen(8124, () => {
  console.log('server bound');
});