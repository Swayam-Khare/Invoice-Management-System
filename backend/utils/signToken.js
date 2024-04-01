const jwt = require("jsonwebtoken");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES * 24 * 60 * 60 * 1000,    
  });
};

module.exports = signToken;