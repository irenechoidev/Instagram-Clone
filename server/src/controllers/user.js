const User = require('../models/user');
const argon2 = require('argon2');
const {
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  UNAUTHORIZED_STATUS_CODE,
  RESOURCE_ALREADY_EXISTS_STATUS_CODE,
  USER_API_CONTROLLER_LOG_GROUP,
  DEFAULT_SEARCH_USERS_LIMIT,
} = require('../commons/constants');
const { createToken } = require('../utils/createToken');
const { getPageNumber } = require('../utils/getPageNumber');
const { removeImageFromStorage } = require('../utils/removeImageFromStorage');

exports.createUser = async (req, res) => {
  const hashedPassword = await argon2.hash(req.body.password);

  try {
    await User.create({
      username: req.body.username,
      password: hashedPassword,
      createdDate: new Date(),
    });
  } catch (error) {
    return res
      .status(RESOURCE_ALREADY_EXISTS_STATUS_CODE)
      .json({ successful: false, token: '' });
  }

  return res.status(OK_STATUS_CODE).json({
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
    return res
      .status(RESOURCE_NOT_FOUND_STATUS_CODE)
      .json({ successful: false, user });
  }

  return res.status(OK_STATUS_CODE).json({ successful: true, user });
};

exports.searchUsers = async (req, res) => {
  const logger = req.logger.getLogGroup(USER_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: GET Api: searchUsers`);

  const pageSize = req.query.pageSize || DEFAULT_SEARCH_USERS_LIMIT;
  const page = getPageNumber(req.query.page);

  const prefix = req.params.prefix || '';

  const users = await User.find({ username: { $regex: prefix, $options: 'i' } })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  logger.info(`END ${req.id} Method: GET Api: searchUsers`);

  return res.status(OK_STATUS_CODE).json({ successful: true, users });
};

exports.updateProfilePic = async (req, res) => {
  const { filename } = req.file;
  let user = await User.findOne({ username: req.params.username });

  if (!user) {
    removeImageFromStorage(filename);

    return res
      .status(RESOURCE_NOT_FOUND_STATUS_CODE)
      .json({ successful: false, user });
  }

  // Remove old profile picture from object storage if it exists
  if (user.profilePic) {
    removeImageFromStorage(user.profilePic);
  }

  // Update the database with the new reference to the image
  await User.updateOne(
    { username: req.params.username },
    { profilePic: filename }
  );

  return res.status(OK_STATUS_CODE).json({ successful: true, user });
};

exports.updateUsername = async (req, res) => {
  let user = null;
  const username = req.body.username;
  const id = req.params.id;

  try {
    await User.updateOne({ _id: id }, { username });
    user = await User.findOne({ _id: id });
  } catch (err) {
    return res.status(RESOURCE_ALREADY_EXISTS_STATUS_CODE).json({
      successful: false,
      user,
    });
  }

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    user,
  });
};

exports.updatePassword = async (req, res) => {
  let user = null;
  const hashedPassword = await argon2.hash(req.body.password);

  await User.updateOne(
    { username: req.params.username },
    { password: hashedPassword }
  );
  user = await User.findOne({ username: req.params.username });

  if (!user) {
    return res
      .status(RESOURCE_NOT_FOUND_STATUS_CODE)
      .json({ successful: false, user });
  }

  return res.status(OK_STATUS_CODE).json({ successful: true, user });
};
