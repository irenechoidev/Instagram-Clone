const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  following: {
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

const Follow = mongoose.model('follow', FollowSchema);
module.exports = Follow;
