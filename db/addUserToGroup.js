const db = require('./index');

const addUserToGroup = async (user_id, group_id) => {
  try {
    const query = `INSERT INTO public.user_in_group
    (user_id, group_id)
    VALUES ( $1, $2)
    RETURNING id;`;
    const values = [user_id, group_id];
    const { rows } = await db.query(query, values);
    return { id: rows[0].id };
  } catch (err) {
    console.log('addUserToGroup', err);
    return { err: err.detail || err.code };
  }
};

module.exports = addUserToGroup;
