const pool =require('../config/dbconfig')
const bcrypt = require('bcryptjs');
const {AppError} = require('../utils/ErrorHandler');
const format = require('pg-format');

class Employee{

    static async login(email, password, compName) {
        const client = await pool.connect();

        const querystring = format('Select * from organization where name = %L', compName);

        const result = await client.query(querystring);

        if (result.rows.length === 0) {
            throw new AppError('wrong organization name please use the correct one', 403);
        }

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

    static async complain(complainedon, content, complainer){
        const client = await pool.connect();

        const findcompSQL =format('select * from complain where comper = %L AND complainedon = %L', complainer, complainedon);
        const compdata = await pool.query(findcompSQL);

        if(compdata.rows.length !== 0){
            throw new AppError(`you already have complained on ${complainedon}`, 401);
        }

        const complaSQL = format('INSERT INTO complain (comper, complainedon, content, createdat ) VALUES(%L, %L, %L, %L)', complainer, complainedon, content, new Date());

        await pool.query(complaSQL)
        
        await client.release()
        
    }
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
    
    static async giveFeedback(userid, title, content){
        const client = await pool.connect();

        const feedSQL = format('INSERT INTO feedback (userid, title, content, createdat ) VALUES(%L, %L, %L, %L)', userid, title, content, new Date());

        await pool.query(feedSQL)
        
        await client.release()
        
    }
}


module.exports = Employee;