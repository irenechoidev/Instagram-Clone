const CREATE_COMMENT_REQUEST_COUNT = 'CreateComment_RequestCount';
const CREATE_COMMENT_LATENCY = 'CreateComment_Latency';
const LIST_COMMENTS_REQUEST_COUNT = 'ListComments_RequestCount';
const LIST_COMMENTS_LATENCY = 'ListComments_Latency';
const UPDATE_COMMENT_REQUEST_COUNT = 'UpdateComment_RequestCount';
const UPDATE_COMMENT_LATENCY = 'UpdateComment_Latency';
const DELETE_COMMENT_REQUEST_COUNT = 'DeleteComment_RequestCount';
const DELETE_COMMENT_LATENCY = 'DeleteComment_Latency';

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

  const listCommentsLatencyData = buildListCommentsLatencyData();
  const listCommentsLatency = meter.createGauge(
    listCommentsLatencyData.name,
    listCommentsLatencyData.metadata
  );

  const updateCommentRequestCountData = buildUpdateCommentRequestCountData();
  const updateCommentRequestCount = meter.createCounter(
    updateCommentRequestCountData.name,
    updateCommentRequestCountData.metadata
  );

  const updateCommentLatencyData = buildUpdateCommentLatencyData();
  const updateCommentLatency = meter.createGauge(
    updateCommentLatencyData.name,
    updateCommentLatencyData.metadata
  );

  const deleteCommentRequestCountData = buildDeleteCommentRequestCountData();
  const deleteCommentRequestCount = meter.createCounter(
    deleteCommentRequestCountData.name,
    deleteCommentRequestCountData.metadata
  );

  const deleteCommentLatencyData = buildDeleteCommentLatencyData();
  const deleteCommentLatency = meter.createGauge(
    deleteCommentLatencyData.name,
    deleteCommentLatencyData.metadata
  );

  return {
    createCommentRequestCount: createCommentRequestCount,
    createCommentLatency: createCommentLatency,
    listCommentsRequestCount: listCommentsRequestCount,
    listCommentsLatency: listCommentsLatency,
    updateCommentRequestCount: updateCommentRequestCount,
    updateCommentLatency: updateCommentLatency,
    deleteCommentRequestCount: deleteCommentRequestCount,
    deleteCommentLatency: deleteCommentLatency,
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

const buildListCommentsLatencyData = () => {
  return {
    name: LIST_COMMENTS_LATENCY,
    metadata: {
      description: 'Records the latency of ListComments API',
    },
  };
};

const buildUpdateCommentRequestCountData = () => {
  return {
    name: UPDATE_COMMENT_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of UpdateComment API requests',
    },
  };
};

const buildUpdateCommentLatencyData = () => {
  return {
    name: UPDATE_COMMENT_LATENCY,
    metadata: {
      description: 'Recoreds the latency of UpdateComment API',
    },
  };
};

const buildDeleteCommentRequestCountData = () => {
  return {
    name: DELETE_COMMENT_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of DeleteComment API requests',
    },
  };
};

const buildDeleteCommentLatencyData = () => {
  return {
    name: DELETE_COMMENT_LATENCY,
    metadata: {
      description: 'Records the latency of DeleteComment API',
    },
  };
};
