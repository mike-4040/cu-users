const db = require('./index');

const getGroupUsers = async (user_id, group_id) => {
  try {
    const query = `SELECT
	    "group".id AS group_id,
	    "group".name AS group_name,
    	user_in_group.user_id,
	    "user".name AS user_name,
	    "user".email
    FROM
	    user_in_group
    JOIN "group" ON user_in_group.group_id = "group".id
    JOIN "user" ON user_in_group.user_id = "user".id
    WHERE "group".owner_id = $1 and "group".id = $2
    ORDER BY "user".name ASC;`;
    const values = [user_id, group_id];
    const { rows } = await db.query(query, values);
    return { rows };
  } catch (err) {
    console.log('getGroupUsers', err);
    return { err: err.detail || err.code };
  }
};

module.exports = getGroupUsers;
