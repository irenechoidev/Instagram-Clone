const Post = require('../models/post');

exports.createPost = async (req, res) => {
  let post = null;

  try {
    post = await Post.create({
      username: req.body.username,
      description: req.body.description,
      createdDate: new Date(),
    });
  } catch (error) {
    return res.json({
      successful: false,
      post,
    });
  }

  return res.json({
    successful: true,
    post,
  });
};

exports.getPost = async (req, res) => {
  let post = null;
  const { id } = req.params;

  try {
    post = await Post.findOne({ _id: id });
  } catch (error) {
    return res.json({
      successful: false,
      post,
    });
  }

  return res.json({
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
    return res.json({
      successful: false,
      post,
    });
  }
  return res.json({
    successful: true,
    post,
  });
};
