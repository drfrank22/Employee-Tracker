const util = require("util");
const mysql = require("mysql");

// establishing connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Louise#89",
  database: "employeeDb"
});

// connection log
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

//   allowing async functions
connection.query = util.promisify(connection.query);

module.exports = connection;