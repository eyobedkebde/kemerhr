require("dotenv").config();

const config = {
    exPort: process.env.EXPORT,
    connectionString : process.env.DATABASE_URL,
    secretkey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRESIN,
    env: "Development",
    cloudinary: {
        cloud_name: process.env.CLOUD_NAME,
        cl_apiKey: process.env.CLOUD_API_KEY,
        cl_apiSecret: process.env.CLOUD_API_SECRET
    }
}
module.exports = config;