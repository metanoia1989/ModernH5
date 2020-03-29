const Koa = require('Koa');
const bodyParser = require('Koa-bodyparser');
const Router = require('Koa-router');

var app = new Koa();
var router = new Router();
app.use(bodyParser());
app.use(router.routes());

router.get('/', async (ctx, next) => {
  ctx.response.body = `
  <form action="/login" method="post">
      <p>Name: <input type="text" name="name"></p>
      <p>Password: <input type="password" name="password"></p>
      <p><input type="submit" value="Submit"></p>
  </form>
  `;
});

router.post('/login', async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.password || '';
  console.log(ctx.request);
  if (name === 'Koa' && password === '12345') {
    ctx.body = 'Success';
  } else {
    ctx.body = 'Login error';
  }
});

router.get(/^\/app(?:\/|$)/, (ctx, next) => {
  console.log(ctx.params);
});

router.get('/:category/:title', (ctx, next) => {
  console.log(ctx.params);
});

// router.get('/delete/blog/:blogId', async (ctx, next) => {
//   await dbApi.delegateBlogId(ctx.params.blogId);
//   await next();
// });

router.get('/delete/blog/:blogId', (ctx, next) => {
  console.log(ctx.params.blogId);
});

router.get(/^\/(.*)(?:\/|$)/, (ctx, next) => {
  console.log(ctx.params);
});


app.listen(3000);



