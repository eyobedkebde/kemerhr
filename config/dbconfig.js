require('dotenv').config();
const { Pool} = require('pg');

const config = {
   
   host: process.env.DB_HOST,
   user: process.env.USER,
   password: process.env.PASSWORD.toString(),
   database: process.env.DATABASE
}

const pool = new Pool(config);

module.exports = pool;