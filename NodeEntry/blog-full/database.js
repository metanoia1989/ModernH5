const mysql = require("mysql");
const config = require("./config");

// 连接数据库
const database = mysql.createConnection({
  ...config,
});
database.connect();

module.exports = database;