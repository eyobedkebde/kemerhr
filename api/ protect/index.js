import { Client } from "pg";

const jwt = require("jsonwebtoken");
const pool = require("../../config/dbconfig");
const ErrorHandler = require("../../utils/ErrorHandler");

export const protect = async (req, res, next) => {
  const client = await pool.connect();
  try {
    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];

      if (!token) return next(new ErrorHandler("Please Login", 400));

      const decoded = jwt.verify(token, config.jwt.secret);

      const role = decoded.role;
      const queryStatement = `select * from user where id =?`;
      const values = [decoded.id];
      await client.query(queryStatement, values, (err, result) => {
        if (err) next(err);
        else if (!result) {
          new ErrorHandler("user not found", 400);
        }
      });

      req.user = result;
    }
  } catch (error) {
    next(error);
  }
};
