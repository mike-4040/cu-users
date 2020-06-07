const db = require('./index');

const getUserGrupsUsers = async (user_id, group_id) => {
  try {
    const query =
      `SELECT
	      "group".id AS group_id,
	      "group".name,
	      "group".owner_id,
	      user_in_group.user_id
      FROM
	      "group"
      LEFT JOIN user_in_group ON user_in_group.group_id = "group".id
      WHERE "group".owner_id = $1 and "group".id = $2;`;
    const values = [user_id, group_id];
    const { rows } = await db.query(query, values);
    return { rows };
  } catch (err) {
    console.log('getUserGrupsUsers', err);
    return { err: err.detail || err.code };
  }
};

module.exports = getUserGrupsUsers;
