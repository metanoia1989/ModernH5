const formidable = require('formidable');
const dbAPI = require('./db');
const fs = require('fs');

async function dealUpload(ctx, next) {
  if (ctx.method == 'POST' && ctx.path == '/upload') {
    var form = new formidable.IncomingForm(); // 创建 Formidable.IncomingForm 对象
    form.keepExtensions = true; // 保持原有的扩展名
    form.uploadDir = __dirname + '/static/html'; // 设置文件存放目录
    form.parse(ctx.req, (err, fields, files) => {
      if (err) { throw err; return; }

      let filename = __dirname + '/static/blogs/' + files.file.name
      // 文件重命名
      fs.renameSync(files.file.path, filename);
      // 更新博客列表
      // var value = await dbAPI.insertBlogList(files.file.name, fields.kind);
      // 将文件内存存入数据库
      dbAPI.saveBlog(filename, fields.kind);
    });

    form.on('progress', (bytesReceived, bytesExpected) => {
      if (bytesExpected > 100 * 1024) {
        console.log('File too big');
        form.emit('error', new Error('File upload canceled by the server.'));
        // TODO 取消用户上传
      }
    });

    form.on('error', () => {
      ctx.body = 'File too big';
    });
  } else {
    await next();
  }
}

module.exports = dealUpload;