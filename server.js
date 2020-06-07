require('dotenv').config();
const express = require('express');

const routes = require('./routes');
const { port } = require('./configrc');
const { errMiddle} = require('./utils/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.use(errMiddle);

app.listen(port, () => console.log(`App listening on port ${port}!`));
