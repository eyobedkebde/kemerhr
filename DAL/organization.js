const pool =require('../config/dbconfig')
const bcrypt = require('bcryptjs');
const crypto = require('crypto')
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
        //       resetPasswordToken character varying(100), resetPasswordExpire character varying(100),
        //       createdat date NOT NULL, UNIQUE(email), UNIQUE(name));`);

        const querystring = `Select * from organization where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);

        if (result.rows.length !== 0) {
            throw new AppError('You already have account please login', 403);
        }   
        const newPass = await bcrypt.hash(password, 10);

        const createOrgSQL = format('INSERT INTO organization (name, email,phonenumber, password, status ,createdat) VALUES(%L, %L, %L, %L, %L, %L)', name, email, phoneNumber, newPass,'InActive', new Date());

        await client.query(createOrgSQL);
       
        await client.release()


    }

    static async actvateOrg(tenantId) {
      const client = await pool.connect();
      
            await client.query(`set search_path to public;`);

            const createOrgSQL = format("UPDATE organization SET status = 'Active' WHERE name= %L", tenantId);

            await client.query(createOrgSQL);

            await client.query(`SET search_path TO ${tenantId}, public;`);

            await client.release();

    }
    
    static async createaNotice(content, title, postby) {
      const client = await pool.connect();

            //REMEMBER TO REMOVE THE THE NUMBER OF READ AND READ FIELD
            //OR TRY TO POST THE INTERNAL NOTICE BASED ON TRIGGERED DELETE
            const createNoticeSQL = format("INSERT INTO internalnotice(title, content, postedby, createdAt) VALUES(%L, %L, %L, %L)", title, content, postby, new Date());

            await client.query(createNoticeSQL);

            await client.release();

    }
    
    static async getcreatedNoices() {
      const client = await pool.connect();

            //REMEMBER TO REMOVE THE THE NUMBER OF READ AND READ FIELD
            //OR TRY TO POST THE INTERNAL NOTICE BASED ON TRIGGERED DELETE

            const noticess = await client.query("Select * from internalnotice;",);

            await client.release();

            return noticess;

    }

    static async removeExistingNotice(noticeId) {
        const client = await pool.connect();

        const not = format('SELECT * FROM internalnotice WHERE id= %L', noticeId)
        const result = await client.query(not);

        if(result.rows.length === 0){
            throw new AppError('selected notice does not exists', 401);
        }
        const noticeSQL = format('DELETE FROM internalnotice WHERE id= %L', noticeId)
        await client.query(noticeSQL);

        await client.release();
    }

    static async getFeedbacks() {
        const client = await pool.connect();
        const feedbacks = await client.query("SELECT * FROM feedback;");

        await client.release();
        return feedbacks.rows
    }
    
    static async removeFeedback(feedbackId) {
        const client = await pool.connect();
        const feed = format('SELECT * FROM feedback WHERE id= %L', feedbackId)

        const result = await client.query(feed);

        if(result.rows.length ===0){
            throw new AppError('selected feedback does not exists', 401);
        }

        const feedbackSQL = format('DELETE FROM feedback WHERE id= %L', feedbackId)

        await client.query(feedbackSQL);

        await client.release();
    }

    static async createTeam(team_name,status) {
        const client = await pool.connect();

        const querystring = `Select * from team where team_name = $1`;
        const value = [team_name];

        const result = await client.query(querystring, value);

        if (result.rows.length !== 0) {
            throw new AppError(`${team_name} already exists!`, 403);
        }

        const createOrgSQL = format('INSERT INTO team (team_name, status, createdat) VALUES (%L, %L, %L)', team_name,status, new Date());

        const team = await client.query(createOrgSQL);
       
        await client.release()

        return team;


    }
    static async addEmployeeData( pictureURL, picturePublic,firstname,lastname,email,phone_number,gender,birthdate,role, teamid, password) {
        const client = await pool.connect();
        console.log(pictureURL, picturePublic,firstname,lastname,email,phone_number,gender,birthdate,role, teamid, password);
        const querystring = `Select * from users where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);

        if (result.rows.length !== 0) {
            throw new AppError('You already have created employee with this account please login', 403);
        }
        
        const newPass = await bcrypt.hash(password, 10);

        const createOrgSQL = format(
            `INSERT INTO users 
            (firstname,lastname,email,phone_number,gender,birthdate,img, imgpub,role, teamid, password, createdat, passwordchangedat)  
            VALUES (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L,  %L)`, 
            firstname,lastname,email,phone_number,gender,birthdate,"pictureURL","picturePublic", role, teamid, newPass, new Date(), new Date());

        const users = await client.query(createOrgSQL);
       
        await client.release()

        return users;

    }

    static async addEmployeeAddress(empid, country, city, subcity, wereda, housenumber){
        const client = await pool.connect();

        
        const querystring = `Select * from user_address where empid = $1`;
        const querystringUser = `Select * from users where id = $1`;
        const value = [empid];

        const result = await client.query(querystring, value);
        
        if (result.rows.length !== 0) {
            throw new AppError('You already have created  address with this employee', 403);
        }
        
        // if (result.rows.length === 0) {
        //     throw new AppError('Please create a user account for the data be inserted', 403);
        // }

        const createOrgSQL = format(`INSERT INTO user_address (empid, country, city, subcity,
             wereda, housenumber, createdat) VALUES (%L, %L, %L, %L, %L, %L, %L)`, 
             empid, country, city, subcity, wereda, housenumber, new Date());

        const users_addres = await client.query(createOrgSQL);
       
        await client.release()

        return users_addres;
    }

    static async addEmployeeMaritalStatus(status, userid, numberofchildren){
        const client = await pool.connect();

        
        const querystring = `Select * from user_marital_status where userid = $1`;
        const querystringUser = `Select * from users where id = $1`;

        const value = [userid];

        const result = await client.query(querystring, value);
        const resultUser = await client.query(querystringUser, value);

        if (result.rows.length !== 0) {
            throw new AppError('You already have created  marital status with this employee', 403);
        }
        if (resultUser.rows.length === 0) {
            throw new AppError('User does not exists', 403);
        }

        const createOrgSQL = format(`INSERT INTO user_marital_status (status, userid,
             numberofchildren, createdat) VALUES (%L, %L, %L, %L)`, status, userid, numberofchildren, new Date());

        const users_marital_status = await client.query(createOrgSQL);
       
        await client.release()

        return users_marital_status;
    }

    static async addEmployeeStatus(userid,yearlyrest,probation,numberofprobation,status){
        const client = await pool.connect();
                
        const querystring = `Select * from user_status where userid = $1`;
        const querystringUser = `Select * from users where id = $1`;

        const value = [userid];

        const result = await client.query(querystring, value);
        const resultUser = await client.query(querystringUser, value);

        if (result.rows.length !== 0) {
            throw new AppError('You already have created  user status info with this employee', 403);
        }
        if (resultUser.rows.length === 0) {
            throw new AppError('User does not exists', 403);
        }


        const createOrgSQL = format(`INSERT INTO user_status (userid,yearlyrest,probation,
            numberofprobation,status, createdat) VALUES (%L, %L,%L, %L, %L, %L)`, 
            userid,yearlyrest,probation,numberofprobation,status, new Date());

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

        if (employee.rows.length === 0) {
            throw new AppError(`their is no employee with this  ${id}`, 403);
        }
        
        const querystring = `DELETE from users WHERE id=${id}`;

        const result = await client.query(querystring);
        await client.release()

        return result;
    }

    static async forgotPassword(email){

        const client = await pool.connect();
       
        
        const querystring = `Select * from organization where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);
        if (result.rows.length === 0) {
            throw new AppError('their is no organization with this  email', 403);
        }

     
        // Generate token
        const resetToken = crypto.randomBytes(20).toString('hex');
        
        // Hash token and set to resetPasswordToken field
        const resetPasswordToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
            
        // Set expire
        const resetPasswordExpire = Date.now() + 10 * 60 * 1000;
        const createOrgSQL = `UPDATE organization SET resetPasswordToken=$1 ,resetPasswordExpire=$2 WHERE email=$3`;
        const queryValue = [resetPasswordToken, resetPasswordExpire, email]
        await client.query(createOrgSQL,queryValue);
       
        return resetToken;

    }

    static async resetPassword(email, resettoken, password){

        const client = await pool.connect();
     

        // Get hashed token
        const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resettoken)
        .digest('hex');

        const newPass = await bcrypt.hash(password, 10);
        
        const querystring = `Select * from organization where resetPasswordToken = $1 AND  resetPasswordExpire > $2`;
        const value = [resetPasswordToken, Date.now()];

        const result = await client.query(querystring, value);
        
        if (result.rows.length === 0) {
            throw new AppError('Invalid token', 400);
        }

        const createOrgSQL = `UPDATE organization SET resetPasswordToken=$1 ,resetPasswordExpire=$2, password=$3 WHERE email=$4`;
        const queryValue = [null, null, newPass, email]
        await client.query(createOrgSQL,queryValue);

        await client.release()       

        return true        
    }

    static async updateUserMaritalStatus(id, status, numberofchildren){

        const client = await pool.connect();
        const querystring = `SELECT * FROM user_marital_status where userid = $1`;
        const value = [id]
        const result = await client.query(querystring,value);
        if (result.rows.length === 0) {
            throw new AppError('There is no employee with this  id', 403);
        }
        const createUserMaritalStatus = `UPDATE user_marital_status  SET status = $1, numberofchildren = $2 WHERE id= $5`;
        const queryValue = [status,numberofchildren,id]
        const userMaritalStatus = await client.query(createUserMaritalStatus,queryValue);
        await client.release();
        return userMaritalStatus
    }  

    static async updateUserStatus(id, yearlyrest, probation, numberofprobation, status){

        const client = await pool.connect();
        const querystring = `SELECT * FROM user_status where userid = $1`;
        const value = [id]
        const result = await client.query(querystring,value);
        if (result.rows.length === 0) {
            throw new AppError('There is no employee with this  id', 403);
        }
        const createUserStatus = `UPDATE user_status  SET status = $1, yearlyrest = $2 , probation = $3, numberofprobation = $4 WHERE id= $5`;
        const queryValue = [status,yearlyrest, probation, numberofprobation]
        const userStatus = await client.query(createUserStatus,queryValue);
        await client.release();
        return userStatus
    } 

    static async updateUserAddress(id, country, city, subcity,wereda, housenumber){

        const client = await pool.connect();
        const querystring = `SELECT * FROM user_address where empid = $1`;
        const value = [id]
        const result = await client.query(querystring,value);
        if (result.rows.length === 0) {
            throw new AppError('There is no employee with this  id', 403);
        }
        const createUserAddress = `UPDATE user_address  SET  country= $1, city = $2, subcity = $3 , wereda = $4, housenumber= $5 WHERE id= $6`;
        const queryValue = [ country, city, subcity,wereda, housenumber, id]
        const userAddress = await client.query(createUserAddress,queryValue);
        await client.release();
        return userAddress
    }  

}


module.exports = Organization;