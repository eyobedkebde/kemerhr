
const pool =require('../config/dbconfig')


module.exports.loginService = async(email, password)=>{
    const client = await pool.connect();

}