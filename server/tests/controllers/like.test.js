const Like = require('../../src/models/like');
const { createLike } = require('../../src/controllers/like');

test('create_Like_Success', async () => {
  const mockPostId = '1234abc';
  const mockUsername = 'abcd';
  const mockBody = {
    postId: mockPostId,
    username: mockUsername,
  };
  const mockReq = { body: mockBody };
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
  const mockBody = {
    postId: mockPostId,
  };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(Like, 'create').mockRejectedValue(new Error());

  await createLike(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(400);
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
