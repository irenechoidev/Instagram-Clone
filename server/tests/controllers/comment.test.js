const Comment = require('../../src/models/comment');
const {
  createComment,
  listComments,
  updateComment,
  deleteComment,
} = require('../../src/controllers/comment');

test('create_Comment_Success', async () => {
  const mockUsername = 'abcd';
  const mockPostId = '12345abc';
  const mockText = 'This is a fake text';
  const mockReq = buildMockRequest();
  mockReq.body = {
    username: mockUsername,
    postId: mockPostId,
    text: mockText,
  };

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
  const mockReq = buildMockRequest();
  mockReq.body = {
    postId: mockPostId,
    text: mockText,
  };

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
  const mockReq = buildMockRequest();
  mockReq.params = { postId: mockPostId };
  mockReq.query = { pageSize: 10, page: 1 };
  const mockRes = buildMockResponse();

  jest.spyOn(Comment, 'find').mockResolvedValue([{}]);

  Comment.find = jest.fn(() => Comment);
  Comment.skip = jest.fn(() => Comment);
  Comment.limit = jest.fn(() => [{}]);

  await listComments(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    comments: [{}],
  });
});

test('update_Comment_Success', async () => {
  const mockId = '1234';
  const mockText = 'This is a fake text';
  const mockReq = buildMockRequest();
  mockReq.body = { text: mockText };
  mockReq.params = { id: mockId };
  const mockRes = buildMockResponse();

  jest.spyOn(Comment, 'updateOne').mockResolvedValue({});
  jest.spyOn(Comment, 'findOne').mockResolvedValue({});

  await updateComment(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    comment: {},
  });
});

test('update_Comment_Resource_Not_Found', async () => {
  const mockId = '1234';
  const mockText = 'This is a fake text';
  const mockReq = buildMockRequest();
  mockReq.body = { text: mockText };
  mockReq.params = { id: mockId };
  const mockRes = buildMockResponse();

  jest.spyOn(Comment, 'updateOne').mockRejectedValue(new Error());

  await updateComment(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    comment: null,
  });
});

test('delete_Comment_Success', async () => {
  const mockId = '1234';
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };
  const mockRes = buildMockResponse();

  jest.spyOn(Comment, 'findOne').mockResolvedValue({});
  jest.spyOn(Comment, 'deleteOne').mockResolvedValue({});

  await deleteComment(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    comment: {},
  });
});

test('delete_Comment_Resource_Not_Found', async () => {
  const mockId = '1234';
  const mockReq = buildMockRequest();
  mockReq.params = { id: mockId };
  const mockRes = buildMockResponse();

  jest.spyOn(Comment, 'findOne').mockResolvedValue(null);

  await deleteComment(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    successful: false,
    comment: null,
  });
});

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);
  return mockRes;
};

const buildMockRequest = () => {
  const mockReq = { metrics: {} };

  mockReq.metrics.createCommentRequestCount = {};
  mockReq.metrics.createCommentLatency = {};

  const { createCommentRequestCount, createCommentLatency } = mockReq.metrics;

  createCommentRequestCount.bind = jest.fn(() => createCommentRequestCount);
  createCommentRequestCount.add = jest.fn();
  createCommentLatency.bind = jest.fn(() => createCommentLatency);
  createCommentLatency.set = jest.fn();

  mockReq.metrics.listCommentsRequestCount = {};
  mockReq.metrics.listCommentsLatency = {};

  const { listCommentsRequestCount, listCommentsLatency } = mockReq.metrics;

  listCommentsRequestCount.bind = jest.fn(() => listCommentsRequestCount);
  listCommentsRequestCount.add = jest.fn();
  listCommentsLatency.bind = jest.fn(() => listCommentsLatency);
  listCommentsLatency.set = jest.fn();

  mockReq.metrics.updateCommentRequestCount = {};
  mockReq.metrics.updateCommentLatency = {};

  const { updateCommentRequestCount, updateCommentLatency } = mockReq.metrics;

  updateCommentRequestCount.bind = jest.fn(() => updateCommentRequestCount);
  updateCommentRequestCount.add = jest.fn();
  updateCommentLatency.bind = jest.fn(() => updateCommentLatency);
  updateCommentLatency.set = jest.fn();

  mockReq.metrics.deleteCommentRequestCount = {};

  const { deleteCommentRequestCount } = mockReq.metrics;

  deleteCommentRequestCount.bind = jest.fn(() => deleteCommentRequestCount);
  deleteCommentRequestCount.add = jest.fn();

  return mockReq;
};
