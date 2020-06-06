const port = process.env.PORT || 3000;

/** Settings for local Postgres,
 *  update if requred */
const localDb = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
};

const remoteDb = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

const connectionParam = process.env.DATABASE_URL ? remoteDb : localDb;

const messages = {
  accCreated: 'Congratulations! Account created. You are loged in.',
  accExistsLoggedIn: 'You have an account already. You are loged in.',
  accExistsWrongPass:
    'You have an account already, but password is wrong, try again.',
  passRequred: 'Password is required',
};
module.exports = {
  port,
  connectionParam,
  messages,
};
