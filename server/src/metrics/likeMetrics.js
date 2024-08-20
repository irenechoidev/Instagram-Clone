const CREATE_LIKE_REQUEST_COUNT = 'CreateLike_RequestCount';
const CREATE_LIKE_LATENCY = 'CreateLike_Latency';

exports.aggregateLikeMetrics = (meter) => {
  const createLikeRequestCountData = buildCreateLikeRequestCountData();
  const createLikeRequestCount = meter.createCounter(
    createLikeRequestCountData.name,
    createLikeRequestCountData.metadata
  );

  const createLikeLatencyData = buildCreateLikeLatencyData();
  const createLikeLatency = meter.createGauge(
    createLikeLatencyData.name,
    createLikeLatencyData.metadata
  );

  return {
    createLikeRequestCount: createLikeRequestCount,
    createLikeLatency: createLikeLatency,
  };
};

const buildCreateLikeRequestCountData = () => {
  return {
    name: CREATE_LIKE_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of CreateLike API requests',
    },
  };
};

const buildCreateLikeLatencyData = () => {
  return {
    name: CREATE_LIKE_LATENCY,
    metadata: {
      description: 'Records the latency of CreateLike API',
    },
  };
};
