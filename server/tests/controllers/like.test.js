const Like = require('../../src/models/like');
const {
  createLike,
  listLikes,
  deleteLike,
} = require('../../src/controllers/like');

test('create_Like_Success', async () => {
  const mockPostId = '1234abc';
  const mockUsername = 'abcd';
  const mockReq = buildMockRequest();
  mockReq.body = {
    postId: mockPostId,
    username: mockUsername,
  };

  const mockRes = buildMockResponse();

  jest.spyOn(Like, 'create').mockResolvedValue({});

  await createLike(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    like: {},
  });
});

test('create_Like_Returns_400', async () => {
  const mockPostId = '1234abc';
  const mockReq = buildMockRequest();
  mockReq.body = { postId: mockPostId };
  const mockRes = buildMockResponse();

  jest.spyOn(Like, 'create').mockRejectedValue(new Error());

  await createLike(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(400);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    like: null,
  });
});

test('list_Likes_Success', async () => {
  const mockPostId = '1234abc';
  const mockReq = buildMockRequest();
  mockReq.params = { postId: mockPostId };
  mockReq.query = { pageSize: 10, page: 1 };

  const mockRes = buildMockResponse();

  jest.spyOn(Like, 'find').mockResolvedValue([{}]);

  Like.find = jest.fn(() => Like);
  Like.skip = jest.fn(() => Like);
  Like.limit = jest.fn(() => [{}]);

  await listLikes(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    likes: [{}],
  });
});

test('delete_Like_Success', async () => {
  const mockId = '1234';
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };

  const mockRes = buildMockResponse();

  jest.spyOn(Like, 'findOne').mockResolvedValue({});
  jest.spyOn(Like, 'deleteOne').mockResolvedValue({});

  await deleteLike(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    like: {},
  });
});

test('delete_Like_Resource_Not_Found', async () => {
  const mockId = '1234';
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };
  const mockRes = buildMockResponse();

  jest.spyOn(Like, 'findOne').mockResolvedValue(null);

  await deleteLike(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    like: null,
  });
});

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);
  return mockRes;
};

const buildMockRequest = () => {
  const mockReq = { metrics: {}, logger: {} };
  mockReq.logger.getLogGroup = jest.fn(() => mockReq.logger);
  mockReq.logger.info = jest.fn();
  mockReq.logger.error = jest.fn();
  mockReq.logger.warn = jest.fn();

  mockReq.metrics.createLikeRequestCount = {};
  mockReq.metrics.createLikeLatency = {};

  const { createLikeRequestCount, createLikeLatency } = mockReq.metrics;

  createLikeRequestCount.bind = jest.fn(() => createLikeRequestCount);
  createLikeRequestCount.add = jest.fn();
  createLikeLatency.bind = jest.fn(() => createLikeLatency);
  createLikeLatency.set = jest.fn();

  mockReq.metrics.listLikesRequestCount = {};
  mockReq.metrics.listLikesLatency = {};

  const { listLikesRequestCount, listLikesLatency } = mockReq.metrics;

  listLikesRequestCount.bind = jest.fn(() => listLikesRequestCount);
  listLikesRequestCount.add = jest.fn();
  listLikesLatency.bind = jest.fn(() => listLikesLatency);
  listLikesLatency.set = jest.fn();

  mockReq.metrics.deleteLikeRequestCount = {};
  mockReq.metrics.deleteLikeLatency = {};

  const { deleteLikeRequestCount, deleteLikeLatency } = mockReq.metrics;

  deleteLikeRequestCount.bind = jest.fn(() => deleteLikeRequestCount);
  deleteLikeRequestCount.add = jest.fn();
  deleteLikeLatency.bind = jest.fn(() => deleteLikeLatency);
  deleteLikeLatency.set = jest.fn();

  return mockReq;
};
