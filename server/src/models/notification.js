const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  postId: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  notificator: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    retuired: false,
  },
  createdDate: {
    type: Date,
    required: true,
  },
});

const Notification = mongoose.model('notification', NotificationSchema);
module.exports = Notification;
