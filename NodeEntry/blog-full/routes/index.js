var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var mysql = require('../database');
const singleNum = 4;

/* GET home page. */
router.get('/', function(req, res, next) {
  var page = req.query.page || 1;
  var start = (page - 1) * singleNum;
  var end = page * singleNum;
  var queryCount = "SELECT COUNT(*) AS articleNum FROM article";
  var query = 'SELECT * FROM article ORDER BY articleID DESC LIMIT ' + start + ',' + end;
  mysql.query(query, (err, rows, fields) => {
    var articles = rows.map(ele=> {
      let m = ele.articleTime.getDate();
      let d = ele.articleTime.getDate();
      var year = ele.articleTime.getFullYear(); 
      var month = m + 1 > 10 ? m : '0' + (m+1);
      var date = d > 10 ? d : '0' + d;
      ele.articleTime = year + '-' + month + '-' + date;
      return ele;
    });
    console.log(articles);
    mysql.query(queryCount, (err, rows, fields) => {
      var articleNum = rows[0].articleNum;
      var pageNum = Math.ceil(articleNum / singleNum);
      res.render('index', { 
        articles, 
        user: req.session.user,
        pageNum,
        page,
      });
    });
  });
});

// 登录页
router.get('/login', (req, res, next) => {
  res.render('login', { message: '', user: '' });
});

router.post('/login', (req, res, next) => {
  var { name, password } = req.body;
  var hash = crypto.createHash('md5');
  hash.update(password);
  password = hash.digest('hex');
  var query = `
    SELECT * FROM author WHERE authorName=${mysql.escape(name)} AND authorPassword=${mysql.escape(password)}
  `;
  mysql.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    var user = rows[0];
    if (!user) {
      res.render('login', { message: '用户名或密码错误' });
      return;
    }
    req.session.user = user;
    res.redirect('/');
  });
});

router.get('/logout', (req, res, next) => {
  req.session.user = null;
  res.redirect('/');
});

// 文章内容页
router.get('/articles/:articleID', (req, res, next) => {
  var articleID = req.params.articleID;
  var query = "SELECT * FROM article WHERE articleID=" + mysql.escape(articleID);
  mysql.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    var article = rows[0];
    var query = "UPDATE article SET articleClick=articleClick+1 WHERE articleID=" + mysql.escape(articleID);
    mysql.query(query, (err, rows, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      let m = article.articleTime.getDate();
      let d = article.articleTime.getDate();
      var year = article.articleTime.getFullYear(); 
      var month = m + 1 > 10 ? m : '0' + (m+1);
      var date = d > 10 ? d : '0' + d;
      article.articleTime = year + '-' + month + '-' + date;
      res.render('article', { article, user: req.session.user });
    });
  });
});

// 文章编辑页面
router.get('/edit', (req, res, next) => {
  var user = req.session.user;
  if (!user) {
    res.redirect('/login');
    return;
  }
  res.render('edit', { user: req.session.user });
});

router.post('/edit', (req, res, next) => {
  var title = req.body.title;
  var content = req.body.content;
  var author = req.session.user.authorName;
  var query = "INSERT article SET articleTitle=" + mysql.escape(title)  + ", articleAuthor=" + mysql.escape(author) + 
    ", articleContent=" + mysql.escape(content) + ", articleTime=CURDATE()";
  mysql.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/');
  });
});

// 友情链接页面
router.get('/friends', (req, res, next) => {
  res.render('friends', { user: req.session.user });
});

// 关于我们页面
router.get('/about', (req, res, next) => {
  res.render('about', { user: req.session.user });
});


// 修改文章的视图及操作
router.get('/modify/:articleID', (req, res, next) => {
  var articleID = req.params.articleID;
  var user = req.session.user;
  var query = "SELECT * FROM article WHERE articleID=" + mysql.escape(articleID);
  if (!user) {
    res.redirect('/login');
    return;
  }
  mysql.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    var article = rows[0];
    var title = article.articleTitle;
    var content = article.articleContent;
    console.log("博客标题及内容：", title, content);
    res.render('modify', { user, title, content });
  });
});

router.post('/modify/:articleID', (req, res, next) => {
  var articleID = req.params.articleID;  
  var user = req.session.user;
  var title = req.body.title;
  var content = req.body.content;
  var query = "UPDATE article SET articleTitle=" + mysql.escape(title) + ", articleContent=" + 
    mysql.escape(content) + " WHERE articleID=" + mysql.escape(articleID);
  mysql.query(query, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/');
  });
});

// 删除文章
router.get('/delete/:articleID', (req, res, next) => {
  var articleID = req.params.articleID;
  var user = req.session.user;
  var query = "DELETE FROM article WHERE articleID=" + mysql.escape(articleID);
  if (!user) {
    res.redirect('/login');
    return;
  }
  mysql.query(query, (err, rows, fields) => {
    res.redirect('/');
  });
});

module.exports = router;
