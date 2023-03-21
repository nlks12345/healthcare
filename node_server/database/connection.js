  // get the client
  const mysql = require('mysql2');
  // create the pool
  const pool = mysql.createPool({
    host:process.env.DB_HOST, 
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE});
//   // now get a Promise wrapped instance of that pool
//   const promisePool = pool.promise();
//   // query database using promises
//   const [rows,fields] = await promisePool.query("SELECT 1");


module.exports = pool.promise()