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
