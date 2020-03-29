const Koa = require('Koa');
const app = new Koa();

app.use((ctx, next) => {
  console.log('method', ctx.method);
  console.log('query', ctx.query);
});

app.listen(3000);