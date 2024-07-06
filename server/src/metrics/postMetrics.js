const GET_POST_REQUEST_COUNT = 'GetPost_RequestCount';

exports.aggregatePostMetrics = (meter) => {
  const getPostRequestCountData = buildGetPostRequestCountData();
  const getPostRequestCount = meter.createCounter(
    getPostRequestCountData.name,
    getPostRequestCountData.metadata
  );

  return {
    getPostRequestCount,
  };
};

const buildGetPostRequestCountData = () => {
  return {
    name: GET_POST_REQUEST_COUNT,
    metadata: {
      description: 'Counts total number of GetPost API requests',
    },
  };
};
