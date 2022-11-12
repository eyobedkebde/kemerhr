const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports.createToken = (orgId) => {
  return jwt.sign({ id: orgId }, config.secretkey, {
    expiresIn: config.expiresIn,
  });
};
