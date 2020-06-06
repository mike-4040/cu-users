/**
 * In a large project utils can be in separate folder
 */

const checkPassword = (password, hash) => password === hash;
const issueTocken = user => `I am token if ${JSON.stringify(user)}`;

module.exports = { checkPassword, issueTocken };
