const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    required: true,
  },
});

const Like = mongoose.model('like', LikeSchema);
module.exports = Like;
