const db = require('./index');

const getUserGroupsUsers = async (userId, groupId) => {
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
    const values = [userId, groupId];
    const { rows } = await db.query(query, values);
    return { rows };
  } catch (err) {
    console.log('getUserGrupsUsers', err);
    return { err: err.detail || err.code };
  }
};

module.exports = getUserGroupsUsers;
