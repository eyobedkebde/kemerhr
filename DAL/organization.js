const pool =require('../config/dbconfig')
const bcrypt = require('bcryptjs');
const {AppError} = require('../utils/ErrorHandler')
class Organization{

    static async login(email, password) {
        
        try{
        const client = await pool.connect();

        await client.query("BEGIN");

        const querystring = `Select * from organization where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);

        if (!result) {
            throw new AppError('Invalid credentials', 401);
        }

        const matchedPass = await bcrypt.compare(password, result.rows[0].password);
        
        if (!matchedPass) {
            throw new AppError('inValid credentials', 401);
        }
        await client.query("COMMIT");
        return result;
    }catch(err){
        throw new AppError("Internal error", 503)
    }
    }
}


module.exports = Organization;