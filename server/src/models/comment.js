const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  isTest: {
    type: Boolean,
    default: false,
  },
  createdDate: {
    type: Date,
    required: true,
  },
});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
