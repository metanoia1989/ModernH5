var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node31845@localhost/node_entry', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', (callback) => {
  console.log('connected');
});

// 创建登录验证的 collection
var loginSchema = new mongoose.Schema({
  username: String,
  password: String,
});
var login = db.model('login', loginSchema, 'login');

// 插入数据
// var user1 = new login({ username: 'Lear', password: 'test' });
// user1.save((err) => {
//   if (err) return handleError(err);
//   console.log('Saved');
// });

// 查询数据
// var query = login.find({ username: 'Lear' });
// query.then((doc) => {
//   console.log('查询到的文档是：', doc);
// });

// 创建博客列表 collection
var blogListSchema = new mongoose.Schema({
  title: String,
  kind: String,
  id: String,
});
var blogList = db.model('blogList', blogListSchema, 'blogList');

// 博客模型
var blogSchema = new mongoose.Schema({
  content: String,
  id: String,
});
var blog = db.model('blog', blogSchema, 'blog');

function handleError(error) {
  console.log("发生了错误：", error);
}

// 登录验证
async function validateLogin(username, password) {
  var pass = '';
  await login.find({ username }).then((doc) => {
    pass = doc[0].password;
  });
  if (password === pass) {
    return true;
  }
  return false;
}

// 查询某个分类下的全部文章
async function getBlogList(kind) {
  let query = {}; // 查询条件，空对象表示没有过滤
  let results = {};
  if (kind != '/') {
    query = { kind };
  }
  results =  await blogList.find(query)
  return results;
}

// 查询数据库中最大的ID
async function queryMaxID() {
  let temp = 0;
  await blogList.find({}).sort({ 'id': -1 }).limit(1).then((doc) => {
    if (doc.length > 0) {
      temp = doc[0].id;
    } else {
      console.log('collection is empty');
    }
  });
  return temp;
}

async function insertBlogList(title, kind) {
  let value = await queryMaxID();
  var record = new blogList({ title, kind, id: ++value });
  await record.save().then((err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('Insert done');
  });
  return value;
}

async function deleteBlogId(id) {
  await blogList.remove({id}).then((doc) => {
    console.log('done');
  });
}

async function modifyBlodKind(id, kind) {
  await blogList.findOneAndUpdate({ id }, { kind }).then((doc) => {
    console.log('done');
  });
}

async function saveBlog(path, id) {
  var content = require('fs').readFileSync(path, { encoding: 'utf-8' });
  var query = new blog({content, id});
  query.save((err) => {
    if (err) return;
    console.log('save done');
  });
}

async function readBlog(id) {
  let content;
  await blogList.find({id}).then((doc) => {
    content = doc[0];
  });
  return content;
}

var dbAPI = {
  validate: validateLogin,
  getBlogList,
  insertBlogList,
  deleteBlogId,
  modifyBlodKind,
  saveBlog,
  readBlog,
};

module.exports = dbAPI;