const db = require('./index');

const createAccount = async (email, name, hash) => {
  try {
     const query = `INSERT INTO public.user (name, email, password)
         VALUES ( $1, $2, $3)
         RETURNING id;`;
     const values = [name, email, hash];
    const { rows } = await db.query(query, values);
    return { id: rows[0].id };
  } catch (err) {
    console.log('Add User', err);
    return { err: err.detail || err.code };
  }
};

module.exports = createAccount;
