const config = require("../config");
const jwt = require("jsonwebtoken");

module.exports.createToken = (payload) => {
  return jwt.sign({ id: payload.id, role: payload.role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
