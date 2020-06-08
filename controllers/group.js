const addGroup = require('../db/addGroup');
const addUser = require('../db/addUser');
const getUserByMail = require('../db/getUserByMail');
const getUserGroupsUsers = require('../db/getUserGroupsUsers');
const addUserToGroup = require('../db/addUserToGroup');
const getGroupUsers = require('../db/getGroupUsers');
const getUserGroups = require('../db/getUserGroups');

const { messages } = require('../configrc');

const userGroups = async ({ user }, res) => {
  try {
    const { rows, err } = await getUserGroups(user.id);
    if (err) return res.json({ msg: messages.dbError, err });
    return res.json({ msg: messages.groupList, rows });
  } catch (err) {
    console.log('userGroups', err);
    return res.status(500).send(err);
  }
};

const createGroup = async ({ body, user }, res) => {
  try {
    const { id, err } = await addGroup(body.name, user.id);
    if (err) return res.json({ msg: messages.dbError, err });
    return res.json({ msg: messages.groupCreated, id });
  } catch (err) {
    console.log('createGroup', err);
    return res.status(500).send(err);
  }
};

const addToGroup = async ({ body, user, params }, res) => {
  const groupId = params.id;
  try {
    /** Check if the User in the db already */
    const { user: dbUser1, err1 } = await getUserByMail(body.email);
    if (err1) return res.json({ msg: messages.dbError, err: err1 });
    let id = dbUser1 && dbUser1.id;

    /** If not => add the User to db  */
    if (!id) {
      const dbRes = await addUser(body.email);
      if (!dbRes.id) return res.json({ msg: messages.dbError, err: dbRes.err });
      id = dbRes.id;
    }

    /** Get list of all Users in the Group */
    const { rows, err } = await getUserGroupsUsers(user.id, groupId);
    if (err) return res.json({ msg: messages.dbError, err });

    /** Check if the Group belong to the Current User */
    if (rows.length === 0) return res.json({ msg: messages.notYourGroup });

    /** Chech if the User in the Group already */
    if (rows.some(el => el.user_id === id)) return res.json({ msg: 'User alredy in the Group' });

    const { recordId, err2 } = await addUserToGroup(id, groupId);
    if (err2) return res.json({ msg: messages.dbError, err2 });
    return res.json({ msg: `User with email ${body.email} added to a Group #${groupId} with ID ${recordId} ` });
  } catch (err) {
    console.log('addToGroup', err);
    return res.status(500).send(err);
  }
};
/** get a list of all users in a group */
const userList = async ({ params, user }, res) => {
  try {
    const { rows, err } = await getGroupUsers(user.id, params.id);
    if (err) return res.json({ msg: messages.dbError, err });
    /** @todo
     *   Current implementation doesn't specify why group is empty, it could be
     * - group is empty
     * - group belongs to another Account
     */
    if (!rows.length) return res.json({ msg: messages.groupEmpty });
    const group = { name: rows[0].group_name, id: rows[0].group_id };
    const users = rows.map(user => ({
      id: user.user_id,
      name: user.user_name || 'Nobody knows :)',
      email: user.email,
    }));
    res.json({ msg: messages.groupUsers, group, users });
  } catch (err) {
    console.log('userList', err);
    return res.status(500).send(err);
  }
};

module.exports = {
  userGroups,
  createGroup,
  addToGroup,
  userList,
};
