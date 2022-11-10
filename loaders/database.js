const {Client} = require('pg');
const config = require('../config/index')
const client = new Client({ 
    connectionString: config.connectionString
});

module.exports = client;