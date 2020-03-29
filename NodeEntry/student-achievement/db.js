const mysql = require("mysql");

const DB = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "student",
};

const DBConnection = mysql.createConnection({
  ...DB,
  multipleStatements: true,
})
DBConnection.connect();

module.exports.DBConnection = DBConnection;