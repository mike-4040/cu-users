require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const routes = require('./routes');
const { port } = require('./configrc');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => console.log(`App listening on port ${port}!`));


// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// client.connect();

// const query = 'SELECT table_schema,table_name FROM information_schema.tables;';

// client.query(
//   query,
//   (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     client.end();
//   }
// );
