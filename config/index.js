require("dotenv").config();

const config = {
    exPort: process.env.EXPORT,
    connectionString : process.env.DATABASE_URL,
}
module.exports = config;