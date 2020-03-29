// 路由

const Router = require('koa-router');
const router = new Router();
const dealUpload = require('./upload');
const dbAPI = require('./db');

router.get('/test', (ctx, next) => {
  debugger;
  ctx.body = "test";
});

router.get('/', async (ctx, next) => {
  ctx.redirect('/blogList');
});

router.get('/login', async (ctx, next) => {
  return ctx.render('login');
});

router.post('/login', async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.password || '';
  const result = await dbAPI.validate(name, password);
  if (result) {
    ctx.cookies.set('LoginStatus', true);
    ctx.redirect('/blogList');
  } else {
    ctx.body = 'Login error';
  }
});

router.get('/blogList', async (ctx, next) => {
  const results = await dbAPI.getBlogList('/');
  return ctx.render('blogList', { results });
});

// TODO 获取某个分类下的文章列表
router.get('/kind/:kindName', async (ctx, next) => {

});

// TODO 获取所有分类
router.get('/kindList', async (ctx, next) => {
  await next();
});

router.get('/blog/:blogId', async (ctx, next) => {
  let blogId = ctx.params.blogId;
  let content = await dbAPI.readBlog(blogId);
  ctx.body = content;
  await next();
});

router.get('/uploadBlog', async (ctx, next) => {
  console.log('upload');
  ctx.redirect('./upload.html');
});

router.get('/modify/blog/:blogId/:kindName', async (ctx, next) => {
  await dbAPI.modifyBlodKind(ctx.params.blogId, ctx.params.kindName);
  await next();
});

router.get('/delete/blog/:blogId', async (ctx, next) => {
  await dbAPI.deleteBlogId(ctx.params.blogId);
  await next();
});

// TODO 删除某个分类
router.post('/delete/kind/:kindName', async (ctx, next) => {
  await next();
});

// TODO 修改类型名
router.post('/modify/kind/:kindName', async (ctx, next) => {
  await next();
});

// TODO 新建分类名称
router.post('/new/kind/:kindName', async (ctx, next) => {
  await next();
});

router.get('/read', async (ctx, next) => {
  var result = await dbAPI.readBlog();
  ctx.body = result.content;
});

module.exports = router;