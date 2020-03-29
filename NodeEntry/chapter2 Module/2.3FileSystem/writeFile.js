// 异步写入文件内容
var fs = require('fs');
fs.writeFile('bar.txt', 
  "諸賢皆是不與取、邪婬、妄言，乃至邪見。", 
  { flat: 'a', encoding: 'utf-8'}, 
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('success');
  }
);