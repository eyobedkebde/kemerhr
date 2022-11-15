const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports.createTokenEmplyee = (orgId, userId) => {
  return jwt.sign({ id: orgId, userId: userId}, config.secretkey, {
    expiresIn: config.expiresIn,
  });
};
