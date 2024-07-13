const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  isTest: {
    type: Boolean,
    default: false,
  },
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
