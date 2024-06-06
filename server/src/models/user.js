const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  createdDate: {
    type: Date,
    required: true,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
