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
      if (!(dbUser && dbUser.password)) return res.json({ msg: messages.noAccount });
      if (!checkPassword(body.password, dbUser.password)) return res.json({ msg: messages.wrongPass });
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
    try {
      const { user: dbUser, err: err1 } = await getUserByEmail(body.email);
      if (err1) return res.json({ msg: messages.dbError, err: err1 });

      if (dbUser) {
        /** @todo add checking User Name against db */
        if (dbUser.password)
          return res.json(
            checkPassword(body.password, dbUser.password)
              ? {
                  msg: messages.accExistsLoggedIn,
                  token: issueToken(dbUser),
                }
              : {
                  msg: messages.accExistsWrongPass,
                }
          );

        const { id, err2 } = await updateUser(hashPassword(body.password), body.name, dbUser.id);
        if (err2) return res.json({ msg: messages.dbError, err: err2 });

        return res.json({
          msg: messages.accCreated,
          token: issueToken({ ...body, id }),
        });
      }

      /** no user in db, creating an account */
      const { id, err } = await createAccount(body.email, body.name, hashPassword(body.password));
      if (err) return res.json({ msg: messages.dbError, err });

      return res.json({
        msg: messages.accCreated,
        token: issueToken({ ...body, id }),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
