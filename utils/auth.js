const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const exJwt = require('express-jwt');

const { authRc } = require('../configrc');

const hashPassword = password =>
  bcrypt.hashSync(password, parseInt(authRc.saltRounds));

const checkPassword = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

const issueToken = ({ id, name }) =>
  jwt.sign({ id, name }, process.env.SERVER_SECRET, {
    expiresIn: authRc.expiresIn,
  });

const verifyToken = token => {
  try {
    return jwt.verify(token, process.env.SERVER_SECRET)
      ? jwt.decode(token)
      : false;
  } catch {
    return false;
  }
};

const authMiddle = exJwt({ secret: process.env.SERVER_SECRET });

const errMiddle = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError')
    res.status(401).send('invalid token...');
};


module.exports = {
  hashPassword,
  checkPassword,
  issueToken,
  verifyToken,
  authMiddle,
  errMiddle
};
