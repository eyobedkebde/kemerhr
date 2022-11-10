//import app from "./app";
const app = require("./app");
const PORT = 3000;
const database = require('./database.js');

async function connect() {
  try{
  await database.connect();
  console.log("database connected")
  }catch(err){
    console.log("db error", err)
  }
}

connect();
app.listen(PORT, () =>
  console.log(`server ready at: http://localhost:${PORT}`)
);
