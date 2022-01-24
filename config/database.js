var { createPool } = require('mysql')

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).on("error", (err) => {
  console.log("Failed to connect to Database - ", err);
});


module.exports = pool;