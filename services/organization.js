const pool = require("../config/dbconfig");

module.exports.loginService = async (email, password) => {
  const client = await pool.connect();
  if (!email || password) {
    return {
      error: true,
      message: "please send data with along correct attribute",
    };

   var queryStatement=`select * from users where email=?`;
   
  }
};
