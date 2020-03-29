const Koa = require('koa');
const app = new Koa();
const serve = require('koa-static');
const router = require('./middleware/route');
const bodyParser = require('koa-bodyparser');
const validateCookie = require('./middleware/validateCookie');
const views = require('koa-views');
const upload = require('./middleware/upload');
const session = require('koa-session');
const redis = require('redis');
const bluebird = require('bluebird');

// 初始化 redis
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var client = redis.createClient('6379', '127.0.0.1');
client.on('error', (error) => {
  console.log(error);
});

client.on('ready', () => {
  console.log('ready');
});

// 初始化 session
app.keys = ['some secret hurr'];
const CONFIG = {
  key: 'Koa:sess',  // string, cookie key 
  maxAge: 86400000, // number, ms default 1days
  overwrite: true,  // boolean, 是否能被覆盖，默认 true
  httpOnly: true, // boolean，默认true
  signed: true, // 签名 
  store: {},
};
CONFIG.store.get = async function (key) {
  console.log('get key ', key);
  var result = await client.getAsync(key);
  console.log('get result: ', result);
  CONFIG.store.destroy(key);
}
CONFIG.store.set = async function (key, sess, maxAge) {
  var result = await client.setAsync(key, JSON.stringify(sess), 'EX', maxAge);
  console.log('set key', key)
}
CONFIG.store.destroy = async function (key) {
  console.log('destory key', key);
  await client.delAsync(key);
}

app.use(session(CONFIG, app));
app.use(async ctx => {
  if (ctx.path === '/favicon.ico') return;
  ctx.session.agent = ctx.header['user-agent'];
});

console.log(__dirname + '/static/html');
app.use(views(__dirname + '/static/html', { extension: 'ejs' }));
app.use(bodyParser());
app.use(validateCookie);
app.use(router.routes());
app.use(upload);
app.use(serve(__dirname + '/static/html', { extensions: ['html'] }));

app.listen(3000, () => {
  console.log('Listening on 3000');
});