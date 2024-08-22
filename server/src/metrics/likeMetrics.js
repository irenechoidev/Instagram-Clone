const CREATE_LIKE_REQUEST_COUNT = 'CreateLike_RequestCount';
const CREATE_LIKE_LATENCY = 'CreateLike_Latency';
const LIST_LIKES_REQUEST_COUNT = 'ListLikes_RequestCount';
const LIST_LIKES_LATENCY = 'ListLikes_Latency';

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

  const listLikesRequestCountData = buildListLikesRequestCountData();
  const listLikesRequestCount = meter.createCounter(
    listLikesRequestCountData.name,
    listLikesRequestCountData.metadata
  );

  const listLikesLatencyData = buildListLikesLatencyData();
  const listLikesLatency = meter.createGauge(
    listLikesLatencyData.name,
    listLikesLatencyData.metadata
  );

  return {
    createLikeRequestCount: createLikeRequestCount,
    createLikeLatency: createLikeLatency,
    listLikesRequestCount: listLikesRequestCount,
    listLikesLatency: listLikesLatency,
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

const buildListLikesRequestCountData = () => {
  return {
    name: LIST_LIKES_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of ListLikes API requests',
    },
  };
};

const buildListLikesLatencyData = () => {
  return {
    name: LIST_LIKES_LATENCY,
    metadata: {
      description: 'Records the latency of ListLikes API',
    },
  };
};
