const {Client} = require('pg');
require('dotenv').config();

const client = new Client({ 

   host: process.env.DB_HOST,
   user: process.env.USER,
   password: process.env.PASSWORD.toString(),
   database: process.env.DATABASE
});

module.exports = client;