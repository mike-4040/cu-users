const validationMiddle = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const { details } = error;
      const message = details.map(i => i.message).join(',');
      res.json({ msg: message });
    } else next();
  };
};
module.exports = validationMiddle;
