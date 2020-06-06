const db = require('../db')

module.exports = {
  signin: ({ body }, res) => res.json({ message: 'signin', ...body }),
  signup: ({ body }, res) => res.json({ message: 'signup', ...body }),
  getUser: (req, res, next) => {
    db.query(
      'SELECT * FROM public.user',
      (err, ressult) => {
        if (err) {
          return next(err);
        }
        res.send(ressult.rows[0]);
      }
    );
  },
};
