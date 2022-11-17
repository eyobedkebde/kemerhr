require('dotenv').config();
const { Pool} = require('pg');

// const config = {
//    port:process.env.PORT,
//    host: process.env.DB_HOST,
//    user: process.env.USER,
//    password: process.env.PASSWORD.toString(),
//    database: process.env.DATABASE
// }

const pool = new Pool({connectionString: process.env.DATABASE_URL});

module.exports = pool;