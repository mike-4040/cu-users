const db = require('./index');

const getUserByMail = async email => {
  try {
    const query = `
      SELECT id, name, email, password
      FROM public.user
      WHERE email = $1;`;
    const values = [email];
    const { rows } = await db.query(query, values);
    return { user: rows[0] || null };
  } catch (err) {
    console.log('Get User By Mail', err);
    return { err: err.detail || err.code };
  }
};

module.exports = getUserByMail;
