const {Client} = require('pg');
require('dotenv').config();

// const config = require('../config/dbconfig')
const client = new Client({ 

   host: process.env.DB_HOST,
   user: process.env.USER,
   password: process.env.PASSWORD.toString(),
   database: process.env.DATABASE
    // user: 'postgres',
    // password: "123456",
    // host: 'localhost',
    // port: 5432,
    // database: 'kemerhrthree'
});

module.exports = client;