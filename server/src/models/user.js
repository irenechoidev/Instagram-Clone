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
  createdDate: {
    type: Date,
    required: false,
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
