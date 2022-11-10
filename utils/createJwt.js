const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports.createToken = (payload) => {
  return jwt.sign({ id: payload.id, role: payload.role }, config.secretkey, {
    expiresIn: config.expiresIn,
  });
};
