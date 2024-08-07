const Follow = require('../../src/models/follow');
const {
  createFollow,
  deleteFollow,
  listFollowers,
  listFollowing,
} = require('../../src/controllers/follow');

test('create_Follow_Success', async () => {
  const mockOwner = 'abc';
  const mockFollowing = 'xyz';
  const mockBody = {
    owner: mockOwner,
    following: mockFollowing,
  };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(Follow, 'create').mockResolvedValue({});

  await createFollow(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    follow: {},
  });
});

test('create_Follow_returns_400', async () => {
  const mockFollowing = 'xyz';
  const mockBody = {
    following: mockFollowing,
  };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(Follow, 'create').mockRejectedValue(new Error());

  await createFollow(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(400);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    follow: null,
  });
});

test('list_Followers_Success', async () => {
  const mockUsername = 'abc';
  const mockReq = buildMockRequest();
  mockReq.params = { following: mockUsername };
  mockReq.query = { pageSize: 10, page: 1 };

  const mockRes = buildMockResponse();

  jest.spyOn(Follow, 'find').mockResolvedValue([{}]);

  Follow.find = jest.fn(() => Follow);
  Follow.skip = jest.fn(() => Follow);
  Follow.limit = jest.fn(() => [{}]);

  await listFollowers(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    followers: [{}],
  });
});

test('list_Following_Success', async () => {
  const mockUsername = 'abc';
  const mockReq = {
    params: { username: mockUsername },
    query: { pageSize: 10, page: 1 },
  };

  const mockRes = buildMockResponse();

  jest.spyOn(Follow, 'find').mockResolvedValue([{}]);

  Follow.find = jest.fn(() => Follow);
  Follow.skip = jest.fn(() => Follow);
  Follow.limit = jest.fn(() => [{}]);

  await listFollowing(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    following: [{}],
  });
});

test('delete_Follow_Success', async () => {
  const mockId = '1234';
  const mockReq = { params: { id: mockId } };
  const mockRes = buildMockResponse();

  jest.spyOn(Follow, 'findOne').mockResolvedValue({});
  jest.spyOn(Follow, 'deleteOne').mockResolvedValue({});

  await deleteFollow(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    follow: {},
  });
});

test('delete_Follow_Resource_Not_Found', async () => {
  const mockId = '1234';
  const mockReq = { params: { id: mockId } };
  const mockRes = buildMockResponse();

  jest.spyOn(Follow, 'findOne').mockResolvedValue(null);

  await deleteFollow(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    follow: null,
  });
});

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);

  return mockRes;
};

const buildMockRequest = () => {
  const mockReq = { logger: {} };
  mockReq.logger.getLogGroup = jest.fn(() => mockReq.logger);
  mockReq.logger.info = jest.fn();

  return mockReq;
};
