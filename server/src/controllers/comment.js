const { BAD_REQUEST, OK_STATUS_CODE } = require('../commons/constants');
const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  let comment = null;

  try {
    await Post.findOne({ _id: req.body.postId });
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
