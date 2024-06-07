const User = require('../models/user');
const argon2 = require('argon2');
const { createToken } = require('../utils/createToken');

exports.createUser = async (req, res) => {
  const hashedPassword = await argon2.hash(req.body.password);

  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    createdDate: new Date(),
  });

  try {
    await user.save();
  } catch (error) {
    res.json({ successful: false, token: '' });
  }

  res.json({
    token: createToken(req.body.username),
    successful: true,
  });
};
