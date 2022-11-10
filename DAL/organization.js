const pool =require('../config/dbconfig')
const bcrypt = require('bcryptjs');

class Organization{

    static async login(email, password) {
        
        const client = await pool.connect();

        await client.query("BEGIN");

        const querystring = `Select * from organization where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);

        if (!result) {
            return console.log('Invalid credentials', 401);
        }

        const matchedPass = await bcrypt.compare(password, result.rows[0].password);
        
        if (!matchedPass) {
            return console.log('inValid credentials', 401);
        }
        await client.query("COMMIT");
        return result;
    }
}


module.exports = Organization;