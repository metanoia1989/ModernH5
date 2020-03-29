// data += buffer 会发生隐式转换，utf-8 一个汉字占三个字节 
// hignWaterMark 内部缓冲区最多能融安的字节数，默认64KB， 等于data事件的chunk大小 
var rs = require("fs").createReadStream("content.txt", {highWaterMark: 10});
var data = '';
rs.on("data", (chunk) => {
  data += chunk;
});

rs.on("end", () => {
  console.log(data);
});

// 数组拼接Buffer
var data2 = [];
rs.on('data',(chunk) => {
  data2.push(chunk);
});
rs.on('end', () => {
  var buf = Buffer.concat(data2);
  console.log(buf.toString());
});