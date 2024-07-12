const GET_POST_REQUEST_COUNT = 'GetPost_RequestCount';
const GET_POST_LATENCY = 'GetPost_Latency';
const LIST_POSTS_REQUEST_COUNT = 'ListPosts_RequestCount';
const LIST_POSTS_LATENCY = 'ListPosts_Latency';
const CREATE_POST_REQUEST_COUNT = 'CreatePost_RequestCount';
const CREATE_POST_LATENCY = 'CreatePost_Latency';
const UPDATE_POST_REQUEST_COUNT = 'UpdatePost_RequestCount';
const UPDATE_POST_LATENCY = 'UpdatePost_Latency';
const DELETE_POST_REQUEST_COUNT = 'DeletePost_RequestCount';
const DELETE_POST_LATENCY = 'DeletePost_Latency';

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

  const listPostsLatencyData = buildListPostsLatencyData();
  const listPostsLatency = meter.createGauge(
    listPostsLatencyData.name,
    listPostsLatencyData.metadata
  );

  const createPostRequestCountData = buildCreatePostRequestCountData();
  const createPostRequestCount = meter.createCounter(
    createPostRequestCountData.name,
    createPostRequestCountData.metadata
  );

  const createPostLatencyData = buildCreatePostLatencyData();
  const createPostLatency = meter.createGauge(
    createPostLatencyData.name,
    createPostLatencyData.metadata
  );

  const updatePostRequestCountData = buildUpdatePostRequestCountData();
  const updatePostRequestCount = meter.createCounter(
    updatePostRequestCountData.name,
    updatePostRequestCountData.metadata
  );

  const updatePostLatencyData = buildUpdatePostLatencyData();
  const updatePostLatency = meter.createGauge(
    updatePostLatencyData.name,
    updatePostLatencyData.metadata
  );

  const deletePostRequestCountData = buildDeletePostRequestCountData();
  const deletePostRequestCount = meter.createCounter(
    deletePostRequestCountData.name,
    deletePostRequestCountData.metadata
  );

  const deletePostLatencyData = buildDeletePostLatencyData();
  const deletePostLatency = meter.createGauge(
    deletePostLatencyData.name,
    deletePostLatencyData.metadata
  );

  return {
    getPostRequestCount,
    getPostLatency,
    listPostsRequestCount,
    listPostsLatency,
    createPostRequestCount,
    createPostLatency,
    updatePostRequestCount,
    updatePostLatency,
    deletePostRequestCount,
    deletePostLatency,
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

const buildListPostsLatencyData = () => {
  return {
    name: LIST_POSTS_LATENCY,
    metadata: {
      description: 'Records the latency of listPosts API',
    },
  };
};

const buildCreatePostRequestCountData = () => {
  return {
    name: CREATE_POST_REQUEST_COUNT,
    metadata: {
      description: 'Counts total number of CreatePost API requests',
    },
  };
};

const buildCreatePostLatencyData = () => {
  return {
    name: CREATE_POST_LATENCY,
    metadata: {
      description: 'Records the latency of createPost API',
    },
  };
};

const buildUpdatePostRequestCountData = () => {
  return {
    name: UPDATE_POST_REQUEST_COUNT,
    metadata: {
      description: 'Counts total number of UpdatePost API requests',
    },
  };
};

const buildUpdatePostLatencyData = () => {
  return {
    name: UPDATE_POST_LATENCY,
    metadata: {
      description: 'Records the latency of updatePost API',
    },
  };
};

const buildDeletePostRequestCountData = () => {
  return {
    name: DELETE_POST_REQUEST_COUNT,
    metadata: {
      description: 'Counts total number of DeletePost API requests',
    },
  };
};

const buildDeletePostLatencyData = () => {
  return {
    name: DELETE_POST_LATENCY,
    metadata: {
      description: 'Records the latency of deletePost API',
    },
  };
};
