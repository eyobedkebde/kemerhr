const http = require('http');

const app = require("./app");
const server = http.createServer(app);

const database = require('./database.js');
const config = require('../config/index')

async function connect() {
  try{
  await database.connect();
  console.log("database connected")
  }catch(err){
    console.log("db error", err)
  }
}

connect();
server.listen(config.exPort, () =>
  console.log(`server ready at: http://localhost:${config.exPort}`)
);
