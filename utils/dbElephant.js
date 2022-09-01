var pg = require('pg');
require('dotenv').config()
//or native libpq bindings
//var pg = require('pg').native

var conString = `postgres://${process.env.ELEPH_USER}:${process.env.ELEPH_PASSWORD}@tyke.db.elephantsql.com/yamrybsr`
var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * FROM users', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows);
    // >> output: 2018-08-23T14:02:57.117Z
    client.end();
  });
});

const elephant=pg.Client
 module.exports={

 }