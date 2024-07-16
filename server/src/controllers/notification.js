const { BAD_REQUEST, OK_STATUS_CODE } = require('../commons/constants');
const Notification = require('../models/notification');

exports.createNotification = async (req, res) => {
  let notification = null;

  try {
    notification = await Notification.create({
      owner: req.body.owner,
      sender: req.body.sender,
      read: req.body.read,
      createdDate: new Date(),
    });
  } catch (error) {
    return res.status(BAD_REQUEST).json({
      successful: false,
      notification,
    });
  }

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    notification,
  });
};

exports.listNotifications = async (req, res) => {
  const { username } = req.params;

  const notifications = await Notification.find({ owner: username });

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    notifications,
  });
};