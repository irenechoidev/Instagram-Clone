const CREATE_COMMENT_REQUEST_COUNT = 'CreateComment_RequestCount';
const CREATE_COMMENT_LATENCY = 'CreateComment_Latency';
const LIST_COMMENTS_REQUEST_COUNT = 'ListComments_RequestCount';

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

  const listCommentsRequestCountData = buildListCommentsRequestCountData();
  const listCommentsRequestCount = meter.createCounter(
    listCommentsRequestCountData.name,
    listCommentsRequestCountData.metadata
  );

  return {
    createCommentRequestCount: createCommentRequestCount,
    createCommentLatency: createCommentLatency,
    listCommentsRequestCount: listCommentsRequestCount,
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

const buildListCommentsRequestCountData = () => {
  return {
    name: LIST_COMMENTS_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of ListComments API requests',
    },
  };
};
