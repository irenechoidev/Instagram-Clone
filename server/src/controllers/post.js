const Post = require('../models/post');
const { createUpload } = require('../utils/createUpload');
const {
  OK_STATUS_CODE,
  BAD_REQUEST,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  DEFAULT_LIST_POSTS_LIMIT,
} = require('../commons/constants');
const { getPageNumber } = require('../utils/getPageNumber');

exports.createPost = async (req, res) => {
  const requestRecieved = new Date().getTime();

  const upload = createUpload();

  upload(req, res, async () => {
    const file = req.file;
    const imgURL = file ? file.filename : null;
    let post = null;

    const { createPostRequestCount, createPostLatency, labels } = req.metrics;

    createPostRequestCount.bind(labels).add(1);

    try {
      post = await Post.create({
        username: req.body.username,
        description: req.body.description,
        imgURL,
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
  const requestRecieved = new Date().getTime();

  let post = null;
  const { id } = req.params;

  const { updatePostRequestCount, updatePostLatency, labels } = req.metrics;

  updatePostRequestCount.bind(labels).add(1);

  try {
    await Post.updateOne(
      { _id: id },
      {
        description: req.body.description,
      }
    );

    post = await Post.findOne({ _id: id });
  } catch (error) {
    const latency = new Date().getTime() - requestRecieved;
    updatePostLatency.bind(labels).set(latency);

    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      post,
    });
  }

  const latency = new Date().getTime() - requestRecieved;
  updatePostLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    post,
  });
};

exports.deletePost = async (req, res) => {
  const requestRecieved = new Date().getTime();

  const { id } = req.params;

  const { deletePostRequestCount, deletePostLatency, labels } = req.metrics;
  deletePostRequestCount.bind(labels).add(1);

  const post = await Post.findOne({ _id: id });

  if (!post) {
    const latency = new Date().getTime() - requestRecieved;
    deletePostLatency.bind(labels).set(latency);

    return res.status(RESOURCE_NOT_FOUND_STATUS_CODE).json({
      successful: false,
      post,
    });
  }

  await Post.deleteOne({ _id: id });

  const latency = new Date().getTime() - requestRecieved;
  deletePostLatency.bind(labels).set(latency);

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

  const pageSize = req.query.pageSize || DEFAULT_LIST_POSTS_LIMIT;
  const page = getPageNumber(req.query.page);

  const posts = await Post.find({ username: username })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const latency = new Date().getTime() - requestRecieved;
  listPostsLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    posts,
  });
};

exports.createTestPosts = async (req, res) => {
  for (let i = 0; i < DEFAULT_LIST_POSTS_LIMIT; i++) {
    await Post.create({
      username: req.body.username,
      description: `Test post number ${i}`,
      isTest: true,
      createdDate: new Date(),
    });
  }

  res.json({ successful: true });
};

exports.cleanTestPosts = async (_, res) => {
  try {
    await Post.deleteMany({ isTest: true });
  } catch (error) {
    return res.json({ successful: false });
  }

  return res.json({ successful: true });
};
