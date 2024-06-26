const Comment = require('../../src/models/comment');
const {
  createComment,
  listComments,
} = require('../../src/controllers/comment');

test('create_Comment_Success', async () => {
  const mockUsername = 'abcd';
  const mockPostId = '12345abc';
  const mockText = 'This is a fake text';
  const mockBody = {
    username: mockUsername,
    postId: mockPostId,
    text: mockText,
  };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(Comment, 'create').mockResolvedValue({});

  await createComment(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    comment: {},
  });
});

test('create_Comment_Returns_400_Bad_Request', async () => {
  const mockPostId = '12345abc';
  const mockText = 'This is a fake text';
  const mockBody = {
    postId: mockPostId,
    text: mockText,
  };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(Comment, 'create').mockRejectedValue(new Error());

  await createComment(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(400);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    comment: null,
  });
});

test('list_Comments_Success', async () => {
  const mockPostId = '1234abc';
  const mockReq = { params: { mockPostId: mockPostId } };
  const mockRes = buildMockResponse();

  jest.spyOn(Comment, 'find').mockResolvedValue([{}]);

  await listComments(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    comments: [{}],
  });
});

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);
  return mockRes;
};
