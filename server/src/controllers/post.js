const Post = require('../models/post');
const {
  OK_STATUS_CODE,
  BAD_REQUEST,
  RESOURCE_NOT_FOUND_STATUS_CODE,
} = require('../commons/constants');

exports.createPost = async (req, res) => {
  const requestRecieved = new Date().getTime();

  let post = null;

  const { createPostRequestCount, createPostLatency, labels } = req.metrics;

  createPostRequestCount.bind(labels).add(1);

  try {
    post = await Post.create({
      username: req.body.username,
      description: req.body.description,
      createdDate: new Date(),
    });
  } catch (error) {
    const latency = new Date().getTime() - requestRecieved;
    createPostLatency.bind(labels).set(latency);

    return res.status(BAD_REQUEST).json({
      successful: false,
      post,
    });
  }

  const latency = new Date().getTime() - requestRecieved;
  createPostLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    post,
  });
};

exports.getPost = async (req, res) => {
  const requestRecieved = new Date().getTime();

  let post = null;
  const { id } = req.params;
  const { getPostRequestCount, getPostLatency, labels } = req.metrics;

  getPostRequestCount.bind(labels).add(1);

  try {
    post = await Post.findOne({ _id: id });
  } catch (error) {
    const latency = new Date().getTime() - requestRecieved;
    getPostLatency.bind(labels).set(latency);

    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      post,
    });
  }

  const latency = new Date().getTime() - requestRecieved;
  getPostLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    post,
  });
};

exports.updatePost = async (req, res) => {
  let post = null;
  const { id } = req.params;

  try {
    await Post.updateOne(
      { _id: id },
      {
        description: req.body.description,
      }
    );

    post = await Post.findOne({ _id: id });
  } catch (error) {
    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      post,
    });
  }

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    post,
  });
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ _id: id });

  if (!post) {
    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      post,
    });
  }

  await Post.deleteOne({ _id: id });

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    post,
  });
};

exports.listPosts = async (req, res) => {
  const requestRecieved = new Date().getTime();

  const { username } = req.params;
  const { listPostsRequestCount, listPostsLatency, labels } = req.metrics;

  listPostsRequestCount.bind(labels).add(1);

  const posts = await Post.find({ username: username });

  const latency = new Date().getTime() - requestRecieved;
  listPostsLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    posts,
  });
};
