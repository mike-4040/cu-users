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
  accExistsWrongPass:
    'You have an account already, but password is wrong, try again.',
  passRequred: 'Password is required',
  noAccount: 'No Account Found, please Sing Up.',
  loggedIn: 'You are in!',
  wrongPass: 'Wrong Password :(',
  groupCreated: 'Group created successfuly.',
  groupList: 'Here is a list of your Groups.',
  dbError: 'Database Error',
  notYourGroup: 'This is not your group, please double check.',
  groupEmpty: 'This Group is empty.',
  groupUsers: 'Here is a list of Users in this Group'
};

const authRc = {
  saltRounds: 10 /** Migh move to environment */,
  expiresIn: '7d',
};

module.exports = {
  port,
  connectionParam,
  messages,
  authRc
};
