const pool =require('../config/dbconfig')
const bcrypt = require('bcryptjs');
const {AppError} = require('../utils/ErrorHandler');
const format = require('pg-format');
const crypto = require('crypto')


class Employee{
    /**
     * login authentication dal
     * @param {string} email 
     * @param {string} password 
     * @param {string} compName 
     * @returns 
     */
    static async login(email, password, compName) {
        const client = await pool.connect();

        const querystring = format('Select * from organization where name = %L', compName);

        const result = await client.query(querystring);

        if (result.rows.length === 0) {
            throw new AppError('wrong organization name please use the correct one', 403);
        }
        
        // change look schema based on user input organization id
        let sql = format('SET search_path TO %L, public', compName);
        await pool.query(sql);

        const empSql = format('select * from users where email= %L', email)
        const empl = await pool.query(empSql);

        if (empl.rows.length === 0) {
            throw new AppError(' wrong email or password, please use the correct one', 403);
        }

        const matchedPass = await bcrypt.compare(password, empl.rows[0].password);
        
        if (!matchedPass) {
            throw new AppError('wrong email or password, please use the correct one', 401);
        }

       await client.release()
        
       return {user: empl,org: result} 
    
    }
    /**
     * create a complain report DAO
     * @param {number} complainedon 
     * @param {string} content 
     * @param {id} complainer 
     */
    static async complain(complainedon, content, complainer){
        const client = await pool.connect();

        const querystringUser = `Select * from users where id = $1`;

        const value = [complainedon];
       
        const resultUser = await client.query(querystringUser, value);
       
        if (resultUser.rows.length === 0) {
            throw new AppError('complained ser does not exists', 403);
        }
        const findcompSQL =format('select * from complain where comper = %L AND complainedon = %L', complainer, complainedon);
        const compdata = await pool.query(findcompSQL);

        if(compdata.rows.length !== 0){
            throw new AppError(`you already have complained on ${complainedon}`, 401);
        }

        const complaSQL = format('INSERT INTO complain (comper, complainedon, content, createdat ) VALUES(%L, %L, %L, %L)', complainer, complainedon, content, new Date());

        await pool.query(complaSQL)
        
        await client.release()
        
    }
    /**
     * remove my complain from db
     * @param {number} complainId 
     */
    static async removeComplain(complainId){
        const client = await pool.connect();

        const findcompSQL =format('select * from complain where cid = %L ', complainId);
        const compdata = await pool.query(findcompSQL);

        if(compdata.rows.length === 0){
            throw new AppError(`there is no complained data that associated with your request|`, 401);
        }

        const complaSQL = format('DELETE FROM complain WHERE cid= %L', complainId);

        await pool.query(complaSQL)
        
        await client.release()
        
    }
    /**
     * get a single complain
     * @param {number} complainId 
     * @returns 
     */
    static async getOneComplain(complainId){
        const client = await pool.connect();

        const findcompSQL =format('select * from complain where cid = %L ', complainId);
        const compdata = await pool.query(findcompSQL);

        if(compdata.rows.length === 0){
            throw new AppError(`there is no complained data that associated with your request|`, 401);
        }
        
        await client.release()
        
        return compdata.rows;
    }
    /**
     * create a feedback 
     * @param {number} userid 
     * @param {string} title 
     * @param {string} content 
     */
    static async giveFeedback(userid, title, content, tenantId){
        const client = await pool.connect();

        const feedSQL = format('INSERT INTO %I.feedback (userid, title, content, createdat ) VALUES(%L, %L, %L, %L)', tenantId,userid, title, content, new Date());
        await pool.query(feedSQL);
        await client.release()
        
    }

    static async forgotPassword(email, organization_name){

        const client = await pool.connect();
        const sql = `SET search_path TO ${organization_name}, public`;
        await client.query(sql);

        
        
        const querystring = `Select * from users where email = $1`;
        const value = [email];

        const result = await client.query(querystring, value);
        if (result.rows.length === 0) {
            throw new AppError('their is no employee with this  email', 403);
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
        const createOrgSQL = `UPDATE users SET resetPasswordToken=$1 ,resetPasswordExpire=$2 WHERE email=$3`;
        const queryValue = [resetPasswordToken, resetPasswordExpire, email]
        await client.query(createOrgSQL,queryValue);
       
        return resetToken;

    }

    static async resetPassword(email, resettoken, password, organization_name){

        const client = await pool.connect();
        const sql = `SET search_path TO ${organization_name}, public`;
        await client.query(sql);

        // Get hashed token
        const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resettoken)
        .digest('hex');

        const newPass = await bcrypt.hash(password, 10);
        
        const querystring = `Select * from users where resetPasswordToken = $1 AND  resetPasswordExpire > $2`;
        const value = [resetPasswordToken, Date.now()];

        const result = await client.query(querystring, value);
        
        if (result.rows.length === 0) {
            throw new AppError('Invalid token', 400);
        }

        const createOrgSQL = `UPDATE users SET resetPasswordToken=$1 ,resetPasswordExpire=$2, password=$3 WHERE email=$4`;
        const queryValue = [null, null, newPass, email]
        await client.query(createOrgSQL,queryValue);

        await client.release()       

        return true        
    }


}


module.exports = Employee;