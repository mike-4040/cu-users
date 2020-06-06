const { Client } = require('pg');
const { localDb, remoteDb } = require('../configrc');

const connectionParam = process.env.DATABASE_URL ? remoteDb : localDb;

const client = new Client(connectionParam);

client.connect();

module.exports = {
  query: (text, params, callback) => client.query(text, params, callback),
};
