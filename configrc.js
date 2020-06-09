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
  accExistsLoggedIn: 'You have an Account already. You are loged in.',
  accExistsWrongPass: 'You have an Account, but password is wrong, try again.',
  dbError: 'Database Error',
  groupCreated: 'Group created successfuly.',
  groupEmpty: 'This Group is empty.',
  groupList: 'Here is a list of your Groups.',
  groupNotExists: 'There is no such Group :(',
  groupNotOwner: 'Hey, this is not your Group! What are you doing here?',
  groupUsers: 'Here is a list of Users in this Group',
  loggedIn: 'You are in!',
  noAccount: 'No Account Found, please Sing Up.',
  passRequred: 'Password is required',
  wrongPass: 'Wrong Password :(',
};

const authRc = {
  saltRounds: 10 /** Migh move to environment */,
  expiresIn: '7d',
};

/** Turn on and of validation */

const validate = false;

module.exports = {
  port,
  connectionParam,
  messages,
  authRc,
  validate,
};
