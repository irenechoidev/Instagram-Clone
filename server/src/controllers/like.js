const { BAD_REQUEST, OK_STATUS_CODE } = require('../commons/constants');
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
  const { postId } = req.params;
  const likes = await Like.find({ postId: postId });
  res.status(OK_STATUS_CODE).json({
    successful: true,
    likes,
  });
};
