const {Client} = require('pg');
const config = require('../config/index')
const client = new Client({ 

        user: 'eyobed',
        password: null,
        host: 'localhost',
        port: 5432,
        database: 'kemerhr'
    // connectionString: config.connectionString
});

module.exports = client;