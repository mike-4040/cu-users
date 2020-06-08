const db = require('../db');
const createAccount = require('../db/createAccount');
const getUserByEmail = require('../db/getUserByMail');
const updateUser = require('../db/updateUser');
const { checkPassword, issueToken, hashPassword } = require('../utils/auth');
const { messages } = require('../configrc');

module.exports = {
  signin: async ({ body }, res) => {
    /** extra layer, body is validated already */
    if (!body.password) return res.json({ msg: messages.passRequred });
    try {
      const { user: dbUser, err } = await getUserByEmail(body.email);
      if (err) return res.json({ msg: messages.dbError, err });
      if (!(dbUser && dbUser.password))
        return res.json({ msg: messages.noAccount });
      if (!checkPassword(body.password, dbUser.password))
        return res.json({ msg: messages.wrongPass });
      return res.json({
        msg: messages.loggedIn,
        token: issueToken(dbUser),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  signup: async ({ body }, res) => {
    /** extra layer, body is validated already */
    if (!body.password) return res.json({ msg: messages.passRequred });
    const query = `SELECT id, name, email, password
                   FROM public.user
                   WHERE email = $1`;
    const values = [body.email];
    try {
      const result = await db.query(query, values);
      const dbUser = result.rows[0];
      
      if (dbUser) {
        /** @todo add checking User Name against db */
        if (dbUser.password)
          if (checkPassword(body.password, dbUser.password))
            return res.json({
              msg: messages.accExistsLoggedIn,
              token: issueToken(dbUser),
            });
          else
            return res.json({
              msg: messages.accExistsWrongPass,
            });
        else {
          const { id, err } = await updateUser(hashPassword(body.password), body.name, dbUser.id);
          if (err) return res.json({ msg: messages.dbError, err });
          return res.json({
            msg: messages.accCreated,
            token: issueToken({ ...body, id }),
          });
        }
      }

      /** no user in db, creating an account */

      const { id, err } = await createAccount(body.email, body.name, hashPassword(body.password));
      if (err) return res.json({ msg: messages.dbError, err });
      return res.json({
        msg: messages.accCreated,
        token: issueToken({ ...body, id }),
      });
    } catch (err) {
      console.log(err.detail);
      return res.status(500).send(err.detail);
    }
  },
};
