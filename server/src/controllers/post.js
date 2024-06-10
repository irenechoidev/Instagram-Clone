const Post = require('../models/post');

exports.createPost = async (req, res) => {
  let message = 'post created';

  try {
    await Post.create({
      username: req.body.username,
      description: req.body.description,
      createdDate: new Date(),
    });
  } catch (error) {
    res.json({ message: error.message });
  }
  res.json({ message: message });
};
