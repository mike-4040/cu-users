const db = require('./index');

const addUser = async email => {
  try {
    const query = `
      INSERT INTO public.user (email)
      VALUES ( $1)
      RETURNING id;`;
    const values = [email];
    const { rows } = await db.query(query, values);
    return { id: rows[0].id };
  } catch (err) {
    console.log('Add User', err);
    return { err: err.detail || err.code };
  }
};

module.exports = addUser;
