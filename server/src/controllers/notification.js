const {
  BAD_REQUEST,
  OK_STATUS_CODE,
  DEFAULT_LIST_NOTIFICATIONS_LIMIT,
  NOTIFICATIONS_API_CONTROLLER_LOG_GROUP,
} = require('../commons/constants');
const Notification = require('../models/notification');
const { getPageNumber } = require('../utils/getPageNumber');

exports.createNotification = async (req, res) => {
  const requestRecieved = new Date().getTime();

  const logger = req.logger.getLogGroup(NOTIFICATIONS_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: POST Api: CreateNotification`);

  const { createNotificationRequestCount, createNotificationLatency, labels } =
    req.metrics;

  createNotificationRequestCount.bind(labels).add(1);

  let notification = null;

  try {
    notification = await Notification.create({
      owner: req.body.owner,
      sender: req.body.sender,
      read: false,
      createdDate: new Date(),
    });
  } catch (error) {
    const latency = new Date().getTime() - requestRecieved;
    createNotificationLatency.bind(labels).set(latency);

    logger.error(error);

    return res.status(BAD_REQUEST).json({
      successful: false,
      notification,
    });
  }

  const latency = new Date().getTime() - requestRecieved;
  createNotificationLatency.bind(labels).set(latency);

  logger.info(`END ${req.id} Method: POST Api: CreateNotification`);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    notification,
  });
};

exports.listNotifications = async (req, res) => {
  const requestRecieved = new Date().getTime();

  const { listNotificationsRequestCount, listNotificationsLatency, labels } =
    req.metrics;
  listNotificationsRequestCount.bind(labels).add(1);

  const logger = req.logger.getLogGroup(NOTIFICATIONS_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: GET Api: ListNotifications`);

  const { username } = req.params;

  const pageSize = req.query.pageSize || DEFAULT_LIST_NOTIFICATIONS_LIMIT;
  const page = getPageNumber(req.query.page);

  const notifications = await Notification.find({ owner: username })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  logger.info(`END ${req.id} Method: GET Api: ListNotifications`);

  const latency = new Date().getTime() - requestRecieved;
  listNotificationsLatency.bind(labels).set(latency);

  return res.status(OK_STATUS_CODE).json({
    successful: true,
    notifications,
  });
};

exports.updateNotifications = async (req, res) => {
  const requestRecieved = new Date().getTime();

  const {
    updateNotificationsRequestCount,
    updateNotificationsLatency,
    labels,
  } = req.metrics;
  updateNotificationsRequestCount.bind(labels).add(1);

  const logger = req.logger.getLogGroup(NOTIFICATIONS_API_CONTROLLER_LOG_GROUP);
  logger.info(`START ${req.id} Method: PUT Api: UpdateNotifications`);

  const { username } = req.params;
  await Notification.updateMany({ owner: username }, { read: true });

  const notifications = await Notification.find({ owner: username });

  logger.info(`END ${req.id} Method: PUT Api: UpdateNotifications`);

  const latency = new Date().getTime() - requestRecieved;
  updateNotificationsLatency.bind(labels).set(latency);

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
