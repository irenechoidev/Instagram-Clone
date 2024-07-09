const Follow = require('../../src/models/follow');
const { createFollow } = require('../../src/controllers/follow');

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

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);
  return mockRes;
};
