const db = require('./index');

const updateUser = async (hash, name, id) => {
  try {
    const query = `UPDATE public.user
                  SET password = $1, name = $2
                  WHERE id=$3
                  RETURNING id;`;
    const values = [hash, name, id];
    const { rows } = await db.query(query, values);
    return { id: rows[0].id };
  } catch (err) {
    console.log('updateUser', err);
    return { err: err.detail || err.code };
  }
};

module.exports = updateUser;
