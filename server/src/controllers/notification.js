const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  RESOURCE_NOT_FOUND_STATUS_CODE,
  DEFAULT_LIST_NOTIFICATIONS_LIMIT,
} = require('../commons/constants');
const Notification = require('../models/notification');
const { getPageNumber } = require('../utils/getPageNumber');

exports.createNotification = async (req, res) => {
  let notification = null;

  try {
    notification = await Notification.create({
      owner: req.body.owner,
      sender: req.body.sender,
      read: false,
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

  const pageSize = req.query.pageSize || DEFAULT_LIST_NOTIFICATIONS_LIMIT;
  const page = getPageNumber(req.query.page);

  const notifications = await Notification.find({ owner: username })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    notifications,
  });
};

exports.updateNotifications = async (req, res) => {
  const { username } = req.params;
  await Notification.updateMany({ owner: username }, { read: true });

  const notifications = await Notification.find({ owner: username });

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    notifications,
  });
};

exports.createTestNotifications = async (req, res) => {
  for (let i = 0; i < DEFAULT_LIST_NOTIFICATIONS_LIMIT; i++) {
    await Notification.create({
      owner: req.body.owner,
      sender: req.body.sender,
      read: false,
      isTest: true,
      createdDate: new Date(),
    });
  }
  res.json({ successful: true });
};

exports.cleanTestsNotifications = async (_, res) => {
  try {
    await Notification.deleteMany({ isTest: true });
  } catch (error) {
    return res.json({ successful: false });
  }
  return res.json({ successful: true });
};
