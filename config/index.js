require("dotenv").config();

const config = {
    exPort: process.env.EXPORT,
    // connectionString : process.env.DATABASE_URL,
    secretkey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRESIN,
    env: "Development"
}
module.exports = config;