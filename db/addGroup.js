const db = require('./index');

const addGroup = async (name, ownerId) => {
  try {
    const query = `INSERT INTO public.group (name, owner_id)
      VALUES ( $1, $2)
      RETURNING id;`;
    const values = [name, ownerId];
    const { rows } = await db.query(query, values);
    const id = rows[0] ? rows[0].id : null;
    return { id };
  } catch (err) {
    console.log('addGroup', err);
    return { err: err.detail || err.code };
  }
};

module.exports = addGroup;
