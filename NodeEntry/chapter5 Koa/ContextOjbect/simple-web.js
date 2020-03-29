const Koa = require('Koa');
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello Wrold';
});

app.listen(3000);