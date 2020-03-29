// 简单的HTTP服务器

var http = require('http');
var server = http.createServer((req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Hello Node!');
});

server.on('connection', (req, res) => {
  console.log('connected');
});

server.on('request', (req, res) => {
  console.log('request');
});

server.listen(3000);