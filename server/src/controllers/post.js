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

exports.deletePost = async (req, res) => {
  let message = 'successfully deleted';
  let post = null;
  const { id } = req.params;

  try {
    post = await Post.findOne({ _id: id });
    await Post.deleteOne({ _id: id });
  } catch (error) {
    return res.json({
      successful: false,
      psot,
    });
  }
  return res.json({
    successful: true,
    message: message,
  });
};
