const db = require('../db');
const addUser = require('../db/addUser');
const getUserByMail = require('../db/getUserByMail');
const getUserGrupsUsers = require('../db/getUserGrupsUsers');
const addUserToGroup = require('../db/addUserToGroup');
const getGrupUsers = require('../db/getGrupUsers');

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

const addToGroup = async ({ body, user, params }, res) => {
  const groupId = params.id;
  try {
    /** Check if the User in the db already */
    const dbRes = await getUserByMail(body.email);
    if (dbRes.err) return res.json({ msg: messages.dbError, err: dbRes.err });
    let id = dbRes.id;

    /** If not => add the User to db  */
    if (!id) {
      const dbRes = await addUser(body.email);
      if (!dbRes.id) return res.json({ msg: messages.dbError, err: dbRes.err });
      id = dbRes.id;
    }

    /** Get list of all Users in the Group */
    const { rows, err } = await getUserGrupsUsers(user.id, groupId);
    if (err) return res.json({ msg: messages.dbError, err });

    /** Check if the Group belong to the Current User */
    if (rows.length === 0) return res.json({ msg: messages.notYourGroup });
    
    /** Chech if the User in the Group already */
    if (rows.some(el => el.user_id === id))
      return res.json({ msg: 'User alredy in the Group' });

    const { recordId, err2 } = await addUserToGroup(id, groupId);
    if (err2) return res.json({ msg: messages.dbError, err2 });
    return res.json({ msg: `User with email ${body.email} added to a Group #${groupId} with ID ${recordId} ` });
  } catch (err) {
    console.log(err.detail, err);
    return res.status(500).send(err.detail);
  }
};
/** get a list of all users in a group */
const userList = async ({ params, user }, res) => {
  const { rows, err } = await getGrupUsers(user.id, params.id);
  if (err) return res.json({ msg: messages.dbError, err });
  if (!rows.length) res.json({ msg: messages.groupEmpty });
  res.json({ msg: messages.groupUsers })
};

module.exports = {
  userGroups,
  createGroup,
  addToGroup,
  userList,
};
