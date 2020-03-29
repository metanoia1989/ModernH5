// 代理服务器

var http = require('http');
var url = require('url');

http.createServer((req, res) => {
  var targetUrl = req.url.substring(1, req.url.length); // 去掉前缀 /
  console.log('one request: ', targetUrl);
  var options = {
    protocol : 'http:',
    hostname: targetUrl,
    port: 80,
    method: 'GET',
    headers: req.headers,
  };

  var proxyRequest = http.request(options, (pres) => {
    res.writeHead(pres.statusCode, pres.headers);
    pres.on('data', (data) => {
      res.write(data);
    });
    pres.on('end', () => {
      res.end();
    });
  });

  req.on('data', (data) => {
    proxyRequest.write(data);
  });

  req.on('end', () => {
    proxyRequest.end();
  });
}).listen(8080);

console.log('server started');