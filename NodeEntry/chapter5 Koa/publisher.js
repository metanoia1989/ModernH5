// 发布者
const redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
client.on('error', (err) => {
  console.log(err);
});
client.on('ready', (err) => {
  console.log('ready');
  setTimeout(() => {
    // 向 test 频道发布一条消息
    client.publish('test', 'hello Node!');
  }, 5000);
});