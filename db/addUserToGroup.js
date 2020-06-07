const db = require('./index');

const addUserToGroup = async (userId, groupId) => {
  try {
    const query = `INSERT INTO public.user_in_group
    (user_id, group_id)
    VALUES ( $1, $2)
    RETURNING id;`;
    const values = [userId, groupId];
    const { rows } = await db.query(query, values);
    return { recordId: rows[0].id };
  } catch (err) {
    console.log('addUserToGroup', err);
    return { err: err.detail || err.code };
  }
};

module.exports = addUserToGroup;
