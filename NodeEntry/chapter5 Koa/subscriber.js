// 订阅者
const redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');
client.on('error', (err) => {
  console.log(err);
});
client.on('ready', (err) => {
  console.log('ready');
});
client.subscribe('test');
client.on('message', (channel, message) => {
  console.log('channel: ' + channel + ', msg: ' + message);
});