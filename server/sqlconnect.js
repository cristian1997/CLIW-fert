var mysql = require('mysql');

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "cliw_proj"
});

conn.connect();

module.exports = {
	conn
};
