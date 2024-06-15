const User = require('../models/user');
const argon2 = require('argon2');
const {
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
} = require('../commons/constants');
const { createToken } = require('../utils/createToken');

exports.createUser = async (req, res) => {
  const hashedPassword = await argon2.hash(req.body.password);

  try {
    await User.create({
      username: req.body.username,
      password: hashedPassword,
      createdDate: new Date(),
    });
  } catch (error) {
    return res.json({ successful: false, token: '' });
  }

  return res.json({
    token: createToken(req.body.username),
    successful: true,
  });
};

exports.loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res
      .status(RESOURCE_NOT_FOUND_STATUS_CODE)
      .json({ successful: false, token: '' });
  }

  const hashedPassword = user.password;
  const isValid = await argon2.verify(hashedPassword, req.body.password);
  if (!isValid) {
    return res
      .status(UNAUTHORIZED_STATUS_CODE)
      .json({ successful: false, token: '' });
  }

  return res.status(OK_STATUS_CODE).json({
    token: createToken(req.body.username),
    successful: true,
  });
};

exports.getUser = async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  if (!user) {
    return res.json({
      successful: false,
      user,
    });
  }

  return res.json({
    successful: true,
    user,
  });
};
