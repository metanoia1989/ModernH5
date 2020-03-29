var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var mysqlQuery = 'SELECT * FROM student';
  db.DBConnection.query(mysqlQuery, (err, rows, fields) => {
    if (err) {
      console.log(err);
      return;
    }
    res.render('user', {students: rows});
  });
});

module.exports = router;
