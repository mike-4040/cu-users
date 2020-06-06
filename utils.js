/**
 * In a large project utils can be in separate folder
 */

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { authRc } = require('./configrc');

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
    return jwt.verify(token, process.env.SERVER_SECRET) ? jwt.decode(token) : false;
  } catch {
    return false;
  }
};

module.exports = { hashPassword, checkPassword, issueToken, verifyToken };
