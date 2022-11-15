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

    static async createTeam(team_name,status) {
        const client = await pool.connect();

        const querystring = `Select * from team where team_name = $1`;
        const value = [team_name];

        const result = await client.query(querystring, value);

        if (result.rows.length !== 0) {
            throw new AppError(`new team Created successfully with the name of ${team_name}!`, 403);
        }

        const createOrgSQL = format('INSERT INTO team (team_name, status, createdat) VALUES (%L, %L, %L)', team_name,status, new Date());

        const team = await client.query(createOrgSQL);
       
        await client.release()

        return team;


    }
    static async addEmployeeData(firstname,lastname,email,phone_number,gender,birthdate,img, role, teamid, password) {
        const client = await pool.connect();

        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

        
        const querystring = `Select * from users where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);

        console.log(result.rows)
        if (result.rows.length !== 0) {
            throw new AppError('You already have created employee with this account please login', 403);
        }
        const newPass = await bcrypt.hash(password, 10);
        console.log(newPass)

        const createOrgSQL = format('INSERT INTO users (firstname,lastname,email,phone_number,gender,birthdate,img, role, teamid, password, createdat, passwordchangedat) VALUES (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L)', firstname,lastname,email,phone_number,gender,birthdate,img, role, teamid, newPass, new Date(), new Date());

        const users = await client.query(createOrgSQL);
       
        await client.release()

        return users;

    }

    static async addEmployeeAddress(empid, country, city, subcity, wereda, housenumber){
        const client = await pool.connect();

        
        const querystring = `Select * from user_address where empid = $1`;
        const value = [empid];

        const result = await client.query(querystring, value);
        console.log(result.rows)
        if (result.rows.length !== 0) {
            throw new AppError('You already have created  address with this employee', 403);
        }

        const createOrgSQL = format('INSERT INTO user_address (empid, country, city, subcity, wereda, housenumber, createdat) VALUES (%L, %L, %L, %L, %L, %L, %L)', empid, country, city, subcity, wereda, housenumber, new Date());

        const users_addres = await client.query(createOrgSQL);
       
        await client.release()

        return users_addres;
    }

    static async addEmployeeMaritalStatus(status, userid, numberofchildren){
        const client = await pool.connect();

        
        const querystring = `Select * from user_marital_status where userid = $1`;
        const value = [userid];

        const result = await client.query(querystring, value);

        if (result.rows.length !== 0) {
            throw new AppError('You already have created  marital status with this employee', 403);
        }

        const createOrgSQL = format('INSERT INTO user_marital_status (status, userid, numberofchildren, createdat) VALUES (%L, %L, %L, %L)', status, userid, numberofchildren, new Date());

        const users_marital_status = await client.query(createOrgSQL);
       
        await client.release()

        return users_marital_status;
    }

    static async addEmployeeStatus(userid,yearlyrest,probation,numberofprobation,status){
        const client = await pool.connect();

        

        const createOrgSQL = format('INSERT INTO user_status (userid,yearlyrest,probation,numberofprobation,status, createdat) VALUES (%L, %L,%L, %L, %L, %L)', userid,yearlyrest,probation,numberofprobation,status, new Date());

        const users_status = await client.query(createOrgSQL);
       
        await client.release()

        return users_status;

    }

    static async updateEmployee(id, firstname,lastname,email,phone_number){
        const client = await pool.connect();

        
        const querystring = `Select * from users where id = $1`;
        const value = [id];

        const result = await client.query(querystring, value);
        if (result.rows.length === 0) {
            throw new AppError('their is no employee with this  id', 403);
        }

        const createOrgSQL = `UPDATE users SET firstname=$1 ,lastname=$2 ,email=$3 ,phone_number=$4  WHERE id=$5`;
        const queryValue = [firstname, lastname, email,phone_number, id]
        const user = await client.query(createOrgSQL,queryValue);
       
        await client.release()

        return user;
    }

    static async getOneEmployee(email){
        const client = await pool.connect();

        
        const querystring = `Select * from users where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);
        
        if (result.rows.length === 0) {
            throw new AppError(`their is no employee with this  ${email}`, 403);
        }

        await client.release()

        return result.rows;
    }

    static async getAllEmployee(){

        const client = await pool.connect();

        
        const querystring = `Select * from users`;

        const result = await client.query(querystring);
        await client.release()

        return result.rows;
    }

    static async deleteEmployee(id){

        const client = await pool.connect();

        
        const selectstring = `Select * from users where id = $1`;
        const value = [id];

        const employee = await client.query(selectstring, value);
        console.log(employee.rows)
        if (employee.rows.length === 0) {
            throw new AppError(`their is no employee with this  ${id}`, 403);
        }
        
        const querystring = `DELETE from users WHERE id=${id}`;

        const result = await client.query(querystring);
        await client.release()

        return result;
    }

}


module.exports = Organization;