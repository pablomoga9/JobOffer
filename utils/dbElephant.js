
const pg = require('pg');
require('dotenv').config()
const ClientClass = pg.Client
const pgUrl = `postgres://${process.env.ELEPH_USER}:${process.env.ELEPH_PASSWORD}@tyke.db.elephantsql.com/yamrybsr`
const client = new ClientClass(pgUrl)
clientConnected=client.connect()
console.log("Estas conectada a elephant", clientConnected);

  

 module.exports=client
