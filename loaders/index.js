//import app from "./app";
const app = require("./app");
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`server ready at: http://localhost:${PORT}`)
);
