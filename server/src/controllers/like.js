const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  LIKES_API_CONTROLLER_LOG_GROUP,
} = require('../commons/constants');
const Like = require('../models/like');

exports.createLike = async (req, res) => {
  let like = null;

  try {
    like = await Like.create({
      postId: req.body.postId,
      username: req.body.username,
      createdDate: new Date(),
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      successful: false,
      like,
    });
  }
  return res.status(OK_STATUS_CODE).json({
    successful: true,
    like,
  });
};

exports.listLikes = async (req, res) => {
  const logger = req.logger.getLogGroup(LIKES_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method GET Api: ListLikes`);

  const { postId } = req.params;
  const likes = await Like.find({ postId: postId });

  logger.info(`END ${req.id} Method: GET Api : ListLikes`);
  return res.status(OK_STATUS_CODE).json({
    successful: true,
    likes,
  });
};

exports.deleteLike = async (req, res) => {
  const { id } = req.params;
  const like = await Like.findOne({ _id: id });

  if (!like) {
    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      like,
    });
  }
  await Like.deleteOne({ _id: id });
  return res.status(OK_STATUS_CODE).json({
    successful: true,
    like,
  });
};
