const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  DEFAULT_LIST_FOLLOWERS_LIMIT,
  DEFAULT_LIST_FOLLOWING_LIMIT,
} = require('../commons/constants');
const Follow = require('../models/follow');
const { getPageNumber } = require('../utils/getPageNumber');

exports.createFollow = async (req, res) => {
  let follow = null;

  try {
    follow = await Follow.create({
      owner: req.body.owner,
      following: req.body.following,
      createdDate: new Date(),
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      successful: false,
      follow,
    });
  }

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    follow,
  });
};

exports.listFollowers = async (req, res) => {
  const { username } = req.params;

  const pageSize = req.query.pageSize || DEFAULT_LIST_FOLLOWERS_LIMIT;
  const page = getPageNumber(req.query.page);

  const followers = await Follow.find({ owner: username })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    followers,
  });
};

exports.listFollowing = async (req, res) => {
  const { username } = req.params;

  const pageSize = req.query.pageSize || DEFAULT_LIST_FOLLOWING_LIMIT;
  const page = getPageNumber(req.query.page);

  const following = await Follow.find({ following: username })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    following,
  });
};

exports.deleteFollow = async (req, res) => {
  const { id } = req.params;
  const follow = await Follow.findOne({ _id: id });

  if (!follow) {
    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      follow,
    });
  }
  await Follow.deleteOne({ _id: id });
  return res.status(OK_STATUS_CODE).json({
    successful: true,
    follow,
  });
};

exports.createTestFollows = async (req, res) => {
  for (let i = 0; i < DEFAULT_LIST_FOLLOWERS_LIMIT; i++) {
    await Follow.create({
      owner: req.body.owner,
      following: req.body.following,
      isTest: true,
      createdDate: new Date(),
    });
  }
  res.json({ successful: true });
};

exports.cleanTestFollows = async (_, res) => {
  try {
    await Follow.deleteMany({ isTest: true });
  } catch (error) {
    return res.json({ successful: false });
  }
  return res.json({ successful: true });
};
