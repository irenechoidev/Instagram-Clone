const GET_POST_REQUEST_COUNT = 'GetPost_RequestCount';
const GET_POST_LATENCY = 'GetPost_Latency';
const LIST_POSTS_REQUEST_COUNT = 'ListPosts_RequestCount';

exports.aggregatePostMetrics = (meter) => {
  const getPostRequestCountData = buildGetPostRequestCountData();
  const getPostRequestCount = meter.createCounter(
    getPostRequestCountData.name,
    getPostRequestCountData.metadata
  );

  const getPostLatencyData = buildGetPostLatencyData();
  const getPostLatency = meter.createGauge(
    getPostLatencyData.name,
    getPostLatencyData.metadata
  );

  const listPostsRequestCountData = buildListPostsRequestCountData();
  const listPostsRequestCount = meter.createCounter(
    listPostsRequestCountData.name,
    listPostsRequestCountData.metadata
  );

  return {
    getPostRequestCount,
    getPostLatency,
    listPostsRequestCount,
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

const buildGetPostLatencyData = () => {
  return {
    name: GET_POST_LATENCY,
    metadata: {
      description: 'Records the latency of GetPost API requests',
    },
  };
};

const buildListPostsRequestCountData = () => {
  return {
    name: LIST_POSTS_REQUEST_COUNT,
    metadata: {
      description: 'Counts total number of ListPosts API requests',
    },
  };
};
