const CREATE_FOLLOW_REQUEST_COUNT = 'CreateFollow_RequestCount';

exports.aggregateFollowMetrics = (meter) => {
  const createFollowRequestCountData = buildCreateFollowRequestCountData();
  const createFollowRequestCount = meter.createCounter(
    createFollowRequestCountData.name,
    createFollowRequestCountData.metadata
  );

  return { createFollowRequestCount: createFollowRequestCount };
};

const buildCreateFollowRequestCountData = () => {
  return {
    name: CREATE_FOLLOW_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of CreateFollow API requests',
    },
  };
};
