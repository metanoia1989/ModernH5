const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root", 
  password: "root",
  database: "tp5api",
});
connection.connect((err) => {
  if (err) {
    console.log("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});
connection.query("SELECT * FROM user", (err, rows) => {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});

const limit = 1;
connection.query('SELECT * FROM post LIMIT ?', [limit], (err, rows) => {
  if (err) {
    console.log(err);
  } else {
    console.log(rows);
  }
});
connection.end();