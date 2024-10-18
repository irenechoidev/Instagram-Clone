const CREATE_FOLLOW_REQUEST_COUNT = 'CreateFollow_RequestCount';
const CREATE_FOLLOW_LATENCY = 'CreateFollow_Latency';
const LIST_FOLLOWERS_REQUEST_COUNT = 'ListFollowers_RequestCount';
const LIST_FOLLOWERS_LATENCY = 'ListFollowers_Latency';
const LIST_FOLLOWING_REQUEST_COUNT = 'ListFollowing_RequestCount';
const LIST_FOLLOWING_REQUEST_LATENCY = 'ListFollowing_Latency';

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

  const listFollowersRequestCountData = buildListFollowersRequestCountData();
  const listFollowersRequestCount = meter.createCounter(
    listFollowersRequestCountData.name,
    listFollowersRequestCountData.metadata
  );

  const listFollowersLatencyData = buildListFollowersLatencyData();
  const listFollowersLatency = meter.createGauge(
    listFollowersLatencyData.name,
    listFollowersLatencyData.metadata
  );

  const listFollowingRequestCountData = buildListFollowingRequestCountData();
  const listFollowingRequestCount = meter.createCounter(
    listFollowingRequestCountData.name,
    listFollowingRequestCountData.metadata
  );

  const listFollowingLatencyData = buildListFollowingLatencyData();
  const listFollowingLatency = meter.createGauge(
    listFollowingLatencyData.name,
    listFollowingLatencyData.metadata
  );

  return {
    createFollowRequestCount: createFollowRequestCount,
    createFollowLatency: createFollowLatency,
    listFollowersRequestCount: listFollowersRequestCount,
    listFollowersLatency: listFollowersLatency,
    listFollowingRequestCount: listFollowingRequestCount,
    listFollowingLatency: listFollowingLatency,
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

const buildListFollowersRequestCountData = () => {
  return {
    name: LIST_FOLLOWERS_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of ListFollowers API requests',
    },
  };
};

const buildListFollowersLatencyData = () => {
  return {
    name: LIST_FOLLOWERS_LATENCY,
    metadata: {
      description: 'Records the latency of ListFollowers API',
    },
  };
};

const buildListFollowingRequestCountData = () => {
  return {
    name: LIST_FOLLOWING_REQUEST_COUNT,
    metadata: {
      description: 'Count total number of ListFollowing API requests',
    },
  };
};

const buildListFollowingLatencyData = () => {
  return {
    name: LIST_FOLLOWING_REQUEST_LATENCY,
    metadata: {
      description: 'Records the latency of ListFollowing API',
    },
  };
};
