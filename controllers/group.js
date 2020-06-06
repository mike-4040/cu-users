module.exports = {
  userGroups: ({ body }, res) =>
    res.json({ message: 'a list of all groups of a user', ...body }),
  createGroup: ({ body }, res) =>
    res.json({ message: 'create a group of a user', ...body }),
  addToGroup: ({ body }, res) =>
    res.json({ message: 'add a user to a group', ...body }),
  userList: ({ body }, res) => res.json({ message: 'userList', ...body }),
};
