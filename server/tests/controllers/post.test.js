const Post = require('../../src/models/post');
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  listPosts,
} = require('../../src/controllers/post');

test('create_Post_Success', async () => {
  const mockUsername = 'abcd';
  const mockDescription = 'This is a fake description';
  const mockReq = buildMockRequest();
  mockReq.body = { username: mockUsername, description: mockDescription };
  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'create').mockResolvedValue({});

  await createPost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    post: {},
  });
});

test('create_Post_Returns_400', async () => {
  const mockDescription = 'This is a fake description';
  const mockBody = { description: mockDescription };
  const mockReq = buildMockRequest();
  mockReq.body = mockBody;

  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'create').mockRejectedValue(new Error());

  await createPost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(400);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    post: null,
  });
});

test('when_Get_Post_Resource_Does_Not_Exist', async () => {
  const mockId = 'abcd';
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };
  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'findOne').mockRejectedValue(new Error());

  await getPost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    post: null,
  });
});

test('get_Post_Success', async () => {
  const mockId = 'abcd';
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };

  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'findOne').mockResolvedValue({});
  await getPost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    post: {},
  });
});

test('update_Post_Resource_Does_Not_Exist', async () => {
  const mockId = 'abcd';
  const mockDescription = 'update test';
  const mockBody = { description: mockDescription };
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };
  mockReq.body = mockBody;
  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'findOne').mockRejectedValue(new Error());

  await updatePost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    post: null,
  });
});

test('update_Post_Success', async () => {
  const mockId = 'abcd';
  const mockDescription = 'update test';
  const mockBody = { description: mockDescription };
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };
  mockReq.body = mockBody;
  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'findOne').mockResolvedValue({});
  jest.spyOn(Post, 'updateOne').mockResolvedValue({});

  await updatePost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    post: {},
  });
});

test('delete_Post_Success', async () => {
  const mockId = 'abcd';
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };
  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'findOne').mockResolvedValue({});
  jest.spyOn(Post, 'deleteOne').mockResolvedValue({});

  await deletePost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    post: {},
  });
});

test('delete_Post_Resource_Does_Not_Exist', async () => {
  const mockId = 'abcd';
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };
  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'findOne').mockResolvedValue(null);

  await deletePost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    post: null,
  });
});

test('list_Posts_Success', async () => {
  const mockUsername = 'abcd';
  const mockReq = buildMockRequest();
  mockReq.params = { username: mockUsername };
  mockReq.query = { pageSize: 10, page: 1 };

  const mockRes = buildMockResponse();

  Post.find = jest.fn(() => Post);
  Post.skip = jest.fn(() => Post);
  Post.limit = jest.fn(() => [{}]);

  await listPosts(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    posts: [{}],
  });
});

const buildMockRequest = () => {
  const mockReq = { metrics: {}, logger: {} };
  mockReq.logger.getLogGroup = jest.fn(() => mockReq.logger);
  mockReq.logger.info = jest.fn();

  mockReq.metrics.getPostRequestCount = {};
  mockReq.metrics.getPostLatency = {};

  const { getPostRequestCount, getPostLatency } = mockReq.metrics;

  getPostRequestCount.bind = jest.fn(() => getPostRequestCount);
  getPostRequestCount.add = jest.fn();
  getPostLatency.bind = jest.fn(() => getPostLatency);
  getPostLatency.set = jest.fn();

  mockReq.metrics.listPostsRequestCount = {};
  mockReq.metrics.listPostsLatency = {};

  const { listPostsRequestCount, listPostsLatency } = mockReq.metrics;

  listPostsRequestCount.bind = jest.fn(() => listPostsRequestCount);
  listPostsRequestCount.add = jest.fn();
  listPostsLatency.bind = jest.fn(() => listPostsLatency);
  listPostsLatency.set = jest.fn();

  mockReq.metrics.createPostRequestCount = {};
  mockReq.metrics.createPostLatency = {};

  const { createPostRequestCount, createPostLatency } = mockReq.metrics;

  createPostRequestCount.bind = jest.fn(() => createPostRequestCount);
  createPostRequestCount.add = jest.fn();
  createPostLatency.bind = jest.fn(() => createPostLatency);
  createPostLatency.set = jest.fn();

  mockReq.metrics.updatePostRequestCount = {};
  mockReq.metrics.updatePostLatency = {};
  const { updatePostRequestCount, updatePostLatency } = mockReq.metrics;

  updatePostRequestCount.bind = jest.fn(() => updatePostRequestCount);
  updatePostRequestCount.add = jest.fn();
  updatePostLatency.bind = jest.fn(() => updatePostLatency);
  updatePostLatency.set = jest.fn();

  mockReq.metrics.deletePostRequestCount = {};
  mockReq.metrics.deletePostLatency = {};
  const { deletePostRequestCount, deletePostLatency } = mockReq.metrics;

  deletePostRequestCount.bind = jest.fn(() => deletePostRequestCount);
  deletePostRequestCount.add = jest.fn();
  deletePostLatency.bind = jest.fn(() => deletePostLatency);
  deletePostLatency.set = jest.fn();

  return mockReq;
};

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);
  return mockRes;
};
