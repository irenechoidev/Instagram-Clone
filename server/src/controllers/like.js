const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  LIKES_API_CONTROLLER_LOG_GROUP,
  DEFAULT_LIST_LIKES_LIMIT,
} = require('../commons/constants');
const Like = require('../models/like');
const { getPageNumber } = require('../utils/getPageNumber');

exports.createLike = async (req, res) => {
  const requestRecieved = new Date().getTime();

  const logger = req.logger.getLogGroup(LIKES_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: POST API: CreateLike`);

  let like = null;

  const { createLikeRequestCount, createLikeLatency, labels } = req.metrics;
  createLikeRequestCount.bind(labels).add(1);

  try {
    like = await Like.create({
      postId: req.body.postId,
      username: req.body.username,
      createdDate: new Date(),
    });
  } catch (error) {
    const latency = new Date().getTime() - requestRecieved;
    createLikeLatency.bind(labels).set(latency);

    logger.error(error);

    return res.status(BAD_REQUEST).json({
      successful: false,
      like,
    });
  }

  const latency = new Date().getTime() - requestRecieved;
  createLikeLatency.bind(labels).set(latency);

  logger.info(`END ${req.id} Method: POST Api: CreateLike`);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    like,
  });
};

exports.listLikes = async (req, res) => {
  const requestRecieved = new Date().getTime();
  const logger = req.logger.getLogGroup(LIKES_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: GET Api: ListLikes`);

  const { listLikesRequestCount, listLikesLatency, labels } = req.metrics;
  listLikesRequestCount.bind(labels).add(1);

  const pageSize = req.query.pageSize || DEFAULT_LIST_LIKES_LIMIT;
  const page = getPageNumber(req.query.page);

  const likes = await Like.find({ postId: req.params.postId })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const latency = new Date().getTime() - requestRecieved;
  listLikesLatency.bind(labels).set(latency);

  logger.info(`END ${req.id} Method: GET Api : ListLikes`);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    likes,
  });
};

exports.deleteLike = async (req, res) => {
  const requestRecieved = new Date().getTime();

  const logger = req.logger.getLogGroup(LIKES_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: DELETE Api: DeleteLike `);

  const { deleteLikeRequestCount, deleteLikeLatency, labels } = req.metrics;
  deleteLikeRequestCount.bind(labels).add(1);

  const { id } = req.params;
  const like = await Like.findOne({ _id: id });

  if (!like) {
    const latency = new Date().getTime() - requestRecieved;
    deleteLikeLatency.bind(labels).set(latency);

    logger.warn(`Like with id: ${id} does not exist`);

    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      like,
    });
  }
  await Like.deleteOne({ _id: id });

  const latency = new Date().getTime() - requestRecieved;
  deleteLikeLatency.bind(labels).set(latency);

  logger.info(`END ${req.id} Method: DELETE Api: DeleteLike`);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    like,
  });
};
