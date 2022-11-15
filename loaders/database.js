const {Client} = require('pg');
require('dotenv').config();

const client = new Client({ 
    user: 'postgres',
    password: "1234",
    host: 'localhost',
    port: 5432,
    database: 'KemrHrNew'
});

module.exports = client;