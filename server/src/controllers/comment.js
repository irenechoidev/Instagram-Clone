const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  DEFAULT_LIST_COMMENTS_LIMIT,
} = require('../commons/constants');
const Comment = require('../models/comment');
const { getPageNumber } = require('../utils/getPageNumber');

exports.createComment = async (req, res) => {
  const requestRecieved = new Date().getTime();
  let comment = null;

  const { createCommentRequestCount, createCommentLatency, labels } =
    req.metrics;

  createCommentRequestCount.bind(labels).add(1);

  try {
    comment = await Comment.create({
      username: req.body.username,
      postId: req.body.postId,
      text: req.body.text,
      createdDate: new Date(),
    });
  } catch (error) {
    const latency = new Date().getTime() - requestRecieved;
    createCommentLatency.bind(labels).set(latency);

    return res.status(BAD_REQUEST).json({
      successful: false,
      comment,
    });
  }

  const latency = new Date().getTime() - requestRecieved;
  createCommentLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    comment,
  });
};

exports.listComments = async (req, res) => {
  const requestRecieved = new Date().getTime();
  const { postId } = req.params;

  const { listCommentsRequestCount, listCommentsLatency, labels } = req.metrics;

  listCommentsRequestCount.bind(labels).add(1);

  const pageSize = req.query.pageSize || DEFAULT_LIST_COMMENTS_LIMIT;
  const page = getPageNumber(req.query.page);

  const comments = await Comment.find({ postId: postId })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const latency = new Date().getTime() - requestRecieved;
  listCommentsLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    comments,
  });
};

exports.updateComment = async (req, res) => {
  let comment = null;
  const { id } = req.params;

  try {
    await Comment.updateOne(
      { _id: id },
      {
        text: req.body.text,
      }
    );

    comment = await Comment.findOne({ _id: id });
  } catch (error) {
    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      comment,
    });
  }

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    comment,
  });
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findOne({ _id: id });

  if (!comment) {
    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      comment,
    });
  }

  await Comment.deleteOne({ _id: id });

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    comment,
  });
};

exports.createTestComments = async (req, res) => {
  for (let i = 0; i < DEFAULT_LIST_COMMENTS_LIMIT; i++) {
    await Comment.create({
      username: req.body.username,
      postId: req.body.postId,
      text: `Test comment number ${i}`,
      isTest: true,
      createdDate: new Date(),
    });
  }
  res.json({ successful: true });
};

exports.cleanTestComments = async (_, res) => {
  try {
    await Comment.deleteMany({ isTest: true });
  } catch (error) {
    return res.json({ successful: false });
  }
  return res.json({ successful: true });
};
