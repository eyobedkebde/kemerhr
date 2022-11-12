const pool =require('../config/dbconfig')
const bcrypt = require('bcryptjs');
const {AppError} = require('../utils/ErrorHandler');
const format = require('pg-format');

class Organization{

    static async login(email, password) {
        const client = await pool.connect();

        const querystring = `Select * from organization where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);

        if (result.rows.length === 0) {
            throw new AppError('wrong email or password', 401);
        }

        const matchedPass = await bcrypt.compare(password, result.rows[0].password);
        
        if (!matchedPass) {
            throw new AppError('wrong email or password', 401);
        }

       await client.release()
        return result;
    }
    
    static async register(name, email,password, phoneNumber) {
        
        const client = await pool.connect();

        // await client.query(`CREATE TABLE organization (id UUID PRIMARY KEY DEFAULT 
        //     gen_random_uuid(), name character varying(100) NOT NULL,
        //      email character varying(100) NOT NULL, phonenumber character varying(100)
        //       NOT NULL, password TEXT NOT NULL,status character varying(100) NOT NULL,
        //       createdat date NOT NULL, UNIQUE(email), UNIQUE(name));`);

        const querystring = `Select * from organization where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);

        if (result.rows.length !== 0) {
            throw new AppError('You already have account please login', 403);
        }
        const newPass = await bcrypt.hash(password, 10);

        const createOrgSQL = format('INSERT INTO organization (name, email,phonenumber, password, status ,createdat) VALUES(%L, %L, %L, %L, %L, %L)', name, email, phoneNumber, newPass,'InActive', new Date());

        const company = await client.query(createOrgSQL);
       
        await client.release()

        return company;

    }

    static async actvateOrg(tenantId) {
      const client = await pool.connect();
        console.log('six')
        try{
            await client.query(`set search_path to public;`);

            const createOrgSQL = format("UPDATE organization SET status = 'Active' WHERE name= %L", tenantId);

            await client.query(createOrgSQL);

            await client.query(`SET search_path TO ${tenantId}, public;`);

            // const b=await client.query(`show search_path;`);

            // console.log(b)
            await client.release();

    }catch(err){
        console.log(err)

    }
    }
}


module.exports = Organization;