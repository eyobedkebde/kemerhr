const { Client, Pool } = require("pg");
const config = require("../config/dbconfig.js");

const pool = new Pool(config);

module.exports = pool;
