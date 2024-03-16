const jwt = require("jsonwebtoken");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
  });
};

module.exports = signToken;
