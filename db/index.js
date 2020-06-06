const { Client } = require('pg');

const { connectionParam } = require('../configrc');

const client = new Client(connectionParam);

client.connect();

module.exports = {
  query: (text, params, callback) => client.query(text, params, callback),
};
