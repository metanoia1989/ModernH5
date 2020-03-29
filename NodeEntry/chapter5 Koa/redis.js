// redis 连接测试
var redis = require('redis');
var client = redis.createClient('6379', '127.0.0.1');
client.on('error', (error) => {
  console.log(error);
});

client.on('ready', () => {
  console.log('ready');
});

// SET GET
client.set('name', 'Lear', redis.print);
client.get('name', (err, reply) => {
  // reply is null when the key is missing
  console.log(reply);
});
client.set('number', '14455', 'EX', 10, redis.print);
client.get('number', redis.print);
setTimeout(() => {
  client.get('number', redis.print);
}, 11000);

// DEL
client.del('name', redis.print);


// 将 node-redis 模块的所有方法Promise化
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
client.setAsync('username', 'smithadam').then(async (res) => {
  console.log('res:', res);
  let result = await client.getAsync('username');
  console.log('username: ', result);
});
