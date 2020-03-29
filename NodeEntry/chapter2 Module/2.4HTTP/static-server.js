// 简单的静态文件服务器

var http = require('http');
var fs = require('fs');
var server = http.createServer((req, res) => {
  if (req.url == '/') {
    // 访问根路径，则显示文件列表
    var fileList = fs.readdirSync('./');
    res.writeHead(200, { 'Content-type': 'text/plain' });
    // 将数组转换为字符串返回
    res.end(fileList.toString());
  } else {
    var path = req.url;
    // 在路径字符串前加.表示目录，避免在*nix系统下访问/文件夹
    fs.readFile('.' + path, (err, data) => {
      if (err) { // 如果该文件不存在，抛出异常
        res.end('Internal Error');
        throw err;
      }
      res.writeHead(200, { "Content-type": "text/plain" });
      res.end(data);
    });
  }
});

var port = 3000;
server.listen(port);
console.log('Listening on 3000');

// 处理异常
process.on('uncaughtException', () => {
  console.log('got error');
});