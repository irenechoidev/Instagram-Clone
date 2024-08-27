const CREATE_FOLLOW_REQUEST_COUNT = 'CreateFollow_RequestCount';
const CREATE_FOLLOW_LATENCY = 'CreateFollow_Latency';

exports.aggregateFollowMetrics = (meter) => {
  const createFollowRequestCountData = buildCreateFollowRequestCountData();
  const createFollowRequestCount = meter.createCounter(
    createFollowRequestCountData.name,
    createFollowRequestCountData.metadata
  );

  const createFollowLatencyData = buildCreateFollowLatencyData();
  const createFollowLatency = meter.createGauge(
    createFollowLatencyData.name,
    createFollowLatencyData.metadata
  );

  return {
    createFollowRequestCount: createFollowRequestCount,
    createFollowLatency: createFollowLatency,
  };
};

const buildCreateFollowRequestCountData = () => {
  return {
    name: CREATE_FOLLOW_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of CreateFollow API requests',
    },
  };
};

const buildCreateFollowLatencyData = () => {
  return {
    name: CREATE_FOLLOW_LATENCY,
    metadata: {
      description: 'Records the latency of CreateFollow API',
    },
  };
};
