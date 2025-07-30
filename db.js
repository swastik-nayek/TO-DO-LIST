const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',  // change if your database is remote
  user: 'root',       // your MySQL username
  password: '86099093',       // your MySQL password
  database: 'tododb'
});
conn.connect();
module.exports = conn;
