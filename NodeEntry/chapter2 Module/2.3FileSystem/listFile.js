// 获取目录下的所有文件名
var fs = require('fs');

function getAllfileFromPath(path) {
  fs.readdir(path, (err, res) => {
    for (let subPath of res) {
      var statObj = fs.statSync(path + '/' + subPath); // 读取文件的状态
      if (statObj.isDirectory()) {
        console.log('Dir: ', subPath);
        getAllfileFromPath(path + '/' + subPath); // 如果是文件夹，递归获取子文件夹中的文件列表
      } else {
        console.log('File: ', subPath);
      }
    }
  });
}

getAllfileFromPath(__dirname);