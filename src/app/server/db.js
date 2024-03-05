const mysql = require('mysql2')

const db = mysql.createPool({
  connectionLimit: 20,
  host: '127.0.0.1',
  port: '3306',
  database: 'userdata',
  user: 'root',
  password: 'k200503',
  database: 'userdata'
})

module.exports = db;