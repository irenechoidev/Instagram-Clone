const CREATE_COMMENT_REQUEST_COUNT = 'CreateComment_RequestCount';

exports.aggregateCommentMetrics = (meter) => {
  const createCommentRequestCountData = buildCreateCommentRequestCountData();
  const createCommentRequestCount = meter.createCounter(
    createCommentRequestCountData.name,
    createCommentRequestCountData.metadata
  );

  return {
    createCommentRequestCount: createCommentRequestCount,
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
