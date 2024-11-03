const CREATE_NOTIFICATION_REQUEST_COUNT = 'CreateNotification_RequestCount';
const CREATE_NOTIFICATION_LATENCY = 'CreateNotification_Latency';
const LIST_NOTIFICATIONS_REQUEST_COUNT = 'ListNotifications_RequestCount';

exports.aggregateNotificationMetrics = (meter) => {
  const createNotificationRequestCountData =
    buildCreateNotificationRequestCountData();
  const createNotificationRequestCount = meter.createCounter(
    createNotificationRequestCountData.name,
    createNotificationRequestCountData.metadata
  );

  const createNotificationLatencyData = buildCreateNotificationLatencyData();
  const createNotificationLatency = meter.createGauge(
    createNotificationLatencyData.name,
    createNotificationLatencyData.metadata
  );

  const listNotificationsRequestCountData =
    buildListNotificationsRequestCountData();
  const listNotificationsRequestCount = meter.createCounter(
    listNotificationsRequestCountData.name,
    listNotificationsRequestCountData.metadata
  );

  return {
    createNotificationRequestCount: createNotificationRequestCount,
    createNotificationLatency: createNotificationLatency,
    listNotificationsRequestCount: listNotificationsRequestCount,
  };
};

const buildCreateNotificationRequestCountData = () => {
  return {
    name: CREATE_NOTIFICATION_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of CreateNotification API reqeusts',
    },
  };
};

const buildCreateNotificationLatencyData = () => {
  return {
    name: CREATE_NOTIFICATION_LATENCY,
    metadata: {
      description: 'Records the latency of CreateNotification API',
    },
  };
};

const buildListNotificationsRequestCountData = () => {
  return {
    name: LIST_NOTIFICATIONS_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of ListNotifications API requests',
    },
  };
};
