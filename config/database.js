const { createPool } = require("mysql");


const pool = createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10
});

pool.on('connection', (connection) => {
  connection.query('SET NAMES utf8')
});


module.exports = pool;