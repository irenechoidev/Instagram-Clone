const Like = require('../../src/models/like');
const {
  createLike,
  listLikes,
  deleteLike,
} = require('../../src/controllers/like');

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

test('list_Likes_Success', async () => {
  const mockPostId = '1234abc';
  const mockReq = { params: { mockPostId: mockPostId } };
  const mockRes = buildMockResponse();

  jest.spyOn(Like, 'find').mockResolvedValue([{}]);

  await listLikes(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    likes: [{}],
  });
});

test('delete_Like_Success', async () => {
  const mockId = '1234';
  const mockReq = { params: { id: mockId } };
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
  const mockReq = { params: { id: mockId } };
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
