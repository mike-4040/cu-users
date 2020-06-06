require('dotenv').config();
const express = require('express');

const routes = require('./routes');
const { port } = require('./configrc');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(port, () => console.log(`App listening on port ${port}!`));
