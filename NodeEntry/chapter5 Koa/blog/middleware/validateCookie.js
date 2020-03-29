// 登录验证中间件

function validateCookie(ctx, next) {
  if (!(ctx.cookies.get('LoginStatus')) && ctx.url != '/login') {
    console.log('Not login');
    ctx.redirect('/login');
  } else {
    return next();
  }
}

module.exports = validateCookie;