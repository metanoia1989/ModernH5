var express = require('express');
var router = express.Router();
var db = require('../db');

/* 成绩录入页面 */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* 成绩录入动作 */
router.post('/', (req, res, next) => {
  var mysqlParams = [
    req.body.name,
    req.body.chinese,
    req.body.english,
    req.body.math,
  ];
  var mysqlQuery = 'INSERT student(name, chinese, english, math)VALUES(?, ?, ?, ?)';
  db.DBConnection.query(mysqlQuery, mysqlParams, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    var success = { message: "增加成功" };
    res.send(success);
  });
});

module.exports = router;
