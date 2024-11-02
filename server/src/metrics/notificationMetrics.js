const CREATE_NOTIFICATION_REQUEST_COUNT = 'CreateNotification_RequestCount';

exports.aggregateNotificationMetrics = (meter) => {
  const createNotificationRequestCountData =
    buildCreateNotificationRequestCountData();
  const createNotificationRequestCount = meter.createCounter(
    createNotificationRequestCountData.name,
    createNotificationRequestCountData.metadata
  );

  return {
    createNotificationRequestCount: createNotificationRequestCount,
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
