const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  owner: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
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

const Notification = mongoose.model('notification', NotificationSchema);
module.exports = Notification;
