const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: process.env.dbUser,
    database: process.env.dbDatabase,
    password: process.env.dbPass
  })

  pool.connect(function(err){
    if(err) throw err;
    console.log("Connected");
  })