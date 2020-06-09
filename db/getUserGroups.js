const db = require('./index');

const getUserGroups = async id => {
  try {
    const query = `
      SELECT id, name
      FROM public.group
      WHERE owner_id = $1
      ORDER BY name ASC ;`;
    const values = [id];
    const { rows } = await db.query(query, values);
    return { rows };
  } catch (err) {
    console.log('getUserGroups', err);
    return { err: err.detail || err.code };
  }
};

module.exports = getUserGroups;
