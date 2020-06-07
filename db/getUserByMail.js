const db = require('./index');

const getUserByMail = async email => {
  try {
    const query = `SELECT id
      FROM public.user
      WHERE email = $1;`;
    const values = [email];
    const { rows } = await db.query(query, values);
    let id = rows[0] ? rows[0].id : null;
    return { id };
  } catch (err) {
    console.log('Get User By Mail', err);
    return { err: err.detail || err.code };
  }
};

module.exports = getUserByMail;
