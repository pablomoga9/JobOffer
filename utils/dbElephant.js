const pg = require('pg');
require('dotenv').config()
const ClientClass = pg.Client
const pgUrl = `postgres://${process.env.ELEPH_USER}:${process.env.ELEPH_PASSWORD}@tyke.db.elephantsql.com/yamrybsr`
const client = new ClientClass(pgUrl)
client.connect()


// //SQL Local
// const { Pool } = require('pg');
// const pool = new Pool({
//     host: process.env.HOST_LOCAL,
//     user: process.env.USER_LOCAL,
//     database: process.env.DB_LOCAL,
//     password: process.env.PASSWORD_LOCAL
//   })
  

 module.exports=client