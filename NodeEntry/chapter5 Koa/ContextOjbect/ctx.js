const Koa = require('Koa');
const app = new Koa();

app.use((ctx, next) => {
  console.log(ctx.request);
  console.log(ctx.response);
});

app.listen(3000);