require('dotenv').config();
const { Pool} = require('pg');

const config = {
   
   host: process.env.DB_HOST,
   user: process.env.USER,
   password: process.env.PASSWORD.toString(),
   database: process.env.DATABASE
   // user: 'postgres',
   // password: "123456",
   // host: 'localhost',
   // port: 5432,
   // database: 'kemerhrthree'
}

const pool = new Pool(config);

module.exports = pool;