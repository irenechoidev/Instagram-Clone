const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  DEFAULT_LIST_FOLLOWERS_LIMIT,
  DEFAULT_LIST_FOLLOWING_LIMIT,
  FOLLOW_API_CONTROLLER_LOG_GROUP,
} = require('../commons/constants');
const Follow = require('../models/follow');
const { getPageNumber } = require('../utils/getPageNumber');

exports.createFollow = async (req, res) => {
  const requestRecieved = new Date().getTime();
  let follow = null;

  const { createFollowRequestCount, createFollowLatency, labels } = req.metrics;
  createFollowRequestCount.bind(labels).add(1);

  try {
    follow = await Follow.create({
      owner: req.body.owner,
      following: req.body.following,
      createdDate: new Date(),
    });
  } catch (error) {
    const latency = requestRecieved - new Date().getTime();
    createFollowLatency.bind(labels).set(latency);

    return res.status(BAD_REQUEST).json({
      successful: false,
      follow,
    });
  }

  const latency = new Date().getTime() - requestRecieved;
  createFollowLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    follow,
  });
};

exports.listFollowers = async (req, res) => {
  const requestRecieved = new Date().getTime();
  const logger = req.logger.getLogGroup(FOLLOW_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: GET Api: ListFollowers`);

  const { username } = req.params;

  const { listFollowersRequestCount, listFollowersLatency, labels } =
    req.metrics;
  listFollowersRequestCount.bind(labels).add(1);

  const pageSize = req.query.pageSize || DEFAULT_LIST_FOLLOWERS_LIMIT;
  const page = getPageNumber(req.query.page);

  const followers = await Follow.find({ owner: username })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  logger.info(`END ${req.id} Method: GET Api: ListFollowers`);

  const latency = new Date().getTime() - requestRecieved;
  listFollowersLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    followers,
  });
};

exports.listFollowing = async (req, res) => {
  const logger = req.logger.getLogGroup(FOLLOW_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: GET APi: ListFollowing`);

  const { username } = req.params;

  const pageSize = req.query.pageSize || DEFAULT_LIST_FOLLOWING_LIMIT;
  const page = getPageNumber(req.query.page);

  const following = await Follow.find({ following: username })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  logger.info(`END ${req.id} Method: GET Api: ListFollowing`);

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
