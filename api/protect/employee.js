const jwt = require("jsonwebtoken");
const pool = require('../../config/dbconfig');
const {AppError} = require('../../utils/ErrorHandler')
const config = require('../../config/index');
const format = require('pg-format');

exports.isolateOrgAndUser = async (req, res, next) => {
  try {
        // Check if there is a cookie with the token on the request header
        let token = "";

        if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
        ) {
        token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            throw new AppError("please login!!!", 403)
        };

        const compData = await jwt.verify(token, config.secretkey);

        var sql = format('SELECT * FROM %I WHERE name = %L', 'organization', compData.id);

        const organization = await pool.query(sql);

        if(organization.rows.length === 0){
          throw new AppError("please login with your correct credential!!", 403)
        }
        
        if(organization.rows[0].status === 'Active'){
          let sql = format('SET search_path TO %L, public', compData.id);
          await pool.query(sql); 
        }

        const emplSql = format('SELECT id from users where id= %L', compData.userId)
        
        const employee = await pool.query(emplSql);

        req.tenantId = compData.id;
        
        req.userId = employee.rows[0].id;
        
        next();
  } catch (error) {
    next(error);
  }
};