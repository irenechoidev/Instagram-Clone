const CREATE_COMMENT_REQUEST_COUNT = 'CreateComment_RequestCount';
const CREATE_COMMENT_LATENCY = 'CreateComment_Latency';

exports.aggregateCommentMetrics = (meter) => {
  const createCommentRequestCountData = buildCreateCommentRequestCountData();
  const createCommentRequestCount = meter.createCounter(
    createCommentRequestCountData.name,
    createCommentRequestCountData.metadata
  );

  const createCommentLatencyData = buildCreateCommentLatencyData();
  const createCommentLatency = meter.createGauge(
    createCommentLatencyData.name,
    createCommentLatencyData.metadata
  );

  return {
    createCommentRequestCount: createCommentRequestCount,
    createCommentLatency: createCommentLatency,
  };
};

const buildCreateCommentRequestCountData = () => {
  return {
    name: CREATE_COMMENT_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of CreateComment API requests',
    },
  };
};

const buildCreateCommentLatencyData = () => {
  return {
    name: CREATE_COMMENT_LATENCY,
    metadata: {
      description: 'Records the latency of CreateComment API',
    },
  };
};
