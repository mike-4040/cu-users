const db = require('../db');
const { messages } = require('../configrc');

const userGroups = async ({ user }, res) => {
  const query = `SELECT id, name
    FROM public.group
    WHERE owner_id = $1
    ORDER BY name ASC ;`;
  const values = [user.id];
  try {
    const { rows } = await db.query(query, values);
    return res.json({ msg: messages.groupList, rows });
  } catch (err) {
    console.log(err.detail, err);
    return res.status(500).send(err.detail);
  }
};

const createGroup = async ({ body, user }, res) => {
  const query = `INSERT INTO public.group (name, owner_id)
    VALUES ( $1, $2)
    RETURNING id;`;
  const values = [body.name, user.id];
  try {
    const { rows } = await db.query(query, values);
    const id = rows[0];
    return res.json({ msg: messages.groupCreated, ...id, ...body });
  } catch (err) {
    console.log(err.detail, err);
    return res.status(500).send(err.detail);
  }
};

const addToGroup = ({ body }, res) =>
  res.json({ message: 'add a user to a group', ...body });

const userList = ({ body }, res) => res.json({ message: 'userList', ...body });

module.exports = {
  userGroups,
  createGroup,
  addToGroup,
  userList,
};
