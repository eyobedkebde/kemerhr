const {Client} = require('pg');
require('dotenv').config();

const client = new Client({ 
   // port:process.env.PORT,
   // host: process.env.DB_HOST,
   // user: process.env.USER,
   // password: process.env.PASSWORD.toString(),
   // database: process.env.DATABASE
   connectionString: process.env.DATABASE_URL
});

module.exports = client;