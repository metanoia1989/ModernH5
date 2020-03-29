// 获取文件的状态

var fs = require('fs');

fs.open('foo.txt', 'a', (err, fd) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(fd);

  fs.fstat(fd, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('\nfs.fstat: ')
    console.log(result);
  });
  fs.close(fd, () => {});
});

fs.stat('bar.txt', (err, result) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('\nfs.stat: ')
  console.log(result);
});