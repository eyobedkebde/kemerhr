const {Client} = require('pg');
const config = require('../config/index')
const client = new Client({ 
    user: 'postgres',
    password: "123456",
    host: 'localhost',
    port: 5432,
    database: 'kemerhrthree'
});

module.exports = client;