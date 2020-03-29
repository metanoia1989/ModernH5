var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface({
  input: fs.createReadStream('foo.txt'),
});

rl.on('line', (data) => {
  console.log(data);
});

rl.on('close', () => {
  console.log('closed');
});
