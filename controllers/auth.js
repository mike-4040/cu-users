module.exports = {
  signin: ({ body }, res) => res.json({ message: 'signin', ...body }),
  signup: ({ body }, res) => res.json({ message: 'signup', ...body }),
};
