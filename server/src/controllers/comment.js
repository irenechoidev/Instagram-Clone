const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
} = require('../commons/constants');
const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  let comment = null;

  try {
    comment = await Comment.create({
      username: req.body.username,
      postId: req.body.postId,
      text: req.body.text,
      createdDate: new Date(),
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      successful: false,
      comment,
    });
  }
  return res.status(OK_STATUS_CODE).json({
    successful: true,
    comment,
  });
};

exports.listComments = async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ postId: postId });
  res.status(OK_STATUS_CODE).json({
    successful: true,
    comments,
  });
};
