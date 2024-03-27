const jwt = require("jsonwebtoken");

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.SECRET_STR, {
    expiresIn: process.env.LOGIN_EXPIRES,
    // expiresIn: process.env.LOGIN_EXPIRES * 60 * 60 * 1000, // Converting hours to miliseconds...
  });
};

module.exports = signToken;
