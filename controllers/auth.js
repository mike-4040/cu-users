const db = require('../db');
const { checkPassword, issueToken, hashPassword } = require('../utils/auth');
const { messages } = require('../configrc');

module.exports = {
  signin: async ({ body }, res) => {
    if (!body.password) return res.json({ msg: messages.passRequred });
    const query = `SELECT id, name, email, password
                   FROM public.user
                   WHERE email = $1`;
    const values = [body.email];
    try {
      const result = await db.query(query, values);
      const dbUser = result.rows[0];
      if (dbUser && dbUser.password) {
        if (checkPassword(body.password, dbUser.password))
          return res.json({
            msg: messages.loggedIn,
            token: issueToken(dbUser),
          });
        else
          return res.json({
            msg: messages.wrongPass,
          });
      } else {
        return res.json({
          msg: messages.noAccount,
        });
      }
    } catch (err) {
      console.log(err.detail);
      return res.status(500).send(err.detail);
    }
  },
  signup: async ({ body }, res) => {
    if (!body.password) return res.json({ msg: messages.passRequred });
    const query1 = `SELECT id, name, email, password
                   FROM public.user
                   WHERE email = $1`;
    const values1 = [body.email];
    try {
      const result = await db.query(query1, values1);
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
          const query2 = `UPDATE public.user
                        SET password = $1
                        WHERE id=$2`;
          const values2 = [hashPassword(body.password), dbUser.id];
          try {
            const result = await db.query(query2, values2);
            const id = result.rows[0].id;
            return res.json({
              msg: messages.accCreated,
              token: issueToken({ ...dbUser, id }),
            });
          } catch (err) {
            console.log(err.detail);
            res.status(500).send(err.detail);
          }
        }
      }
      const query = `INSERT INTO public.user (name, email, password)
         VALUES ( $1, $2, $3)
         RETURNING id;`;
      const values = [body.name, body.email, hashPassword(body.password)];
      try {
        const result = await db.query(query, values);
        const id = result.rows[0].id;
        return res.json({
          msg: messages.accCreated,
          token: issueToken({ ...body, id }),
        });
      } catch (err) {
        console.log(err.detail);
        res.status(500).send(err.detail);
      }
    } catch (err) {
      //catch of getting user from db
      console.log(err.detail);
      return res.status(500).send(err.detail);
    }
  },
};
