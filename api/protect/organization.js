const jwt = require("jsonwebtoken");
const pool = require('../../config/dbconfig');
const AppError = require('../../utils/ErrorHandler')
const config = require('../../config/index');
const format = require('pg-format');

exports.isolate = async (req, res, next) => {
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

        const user = await pool.query(sql).catch(err=>console.log(err));

        if(user.rows.length === 0){
          throw new AppError("please login with your correct credential!!", 403)
        }
        
        req.tenantId = compData.id;
        next();
  } catch (error) {
    next(error);
  }
};