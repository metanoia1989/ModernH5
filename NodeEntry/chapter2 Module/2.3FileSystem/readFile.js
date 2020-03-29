var fs = require('fs');
fs.readFile('foo.txt', (err, data) => {
  if (err) throw err;
  console.log('\n异步读取文本文件: ');
  console.log(data.toString());
});

  console.log('\n同步读取文本文件: ');
  var data = fs.readFileSync('foo.txt', { encoding: 'UTF-8' });
  console.log(data);