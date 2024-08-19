const CREATE_LIKE_REQUEST_COUNT = 'CreateLike_RequestCount';

exports.aggregateLikeMetrics = (meter) => {
  const createLikeRequestCountData = buildCreateLikeRequestCountData();
  const createLikeRequestCount = meter.createCounter(
    createLikeRequestCountData.name,
    createLikeRequestCountData.metadata
  );

  return { createLikeRequestCount: createLikeRequestCount };
};

const buildCreateLikeRequestCountData = () => {
  return {
    name: CREATE_LIKE_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of CreateLike API requests',
    },
  };
};
