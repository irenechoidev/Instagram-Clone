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
  const mockBody = { username: mockUsername, description: mockDescription };
  const mockReq = { body: mockBody };
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
  const mockReq = { body: mockBody };
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
  const mockReq = { params: { id: mockId } };
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
  const mockReq = { params: { id: mockId } };
  const mockRes = buildMockResponse();

  jest.spyOn(Post, 'findOne').mockResolvedValue({});

  await getPost(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    successful: true,
    post: {},
  });
});

test('update_post_success', async () => {
  const mockId = 'abcd';
  const mockDescription = 'update test';
  const mockBody = { description: mockDescription };
  const mockReq = { params: { id: mockId }, body: mockBody };
  const mockRes = { json: (payload) => payload };

  jest.spyOn(Post, 'findOne').mockResolvedValueOnce({});
  jest.spyOn(Post, 'updateOne').mockResolvedValueOnce({});

  const payload = await updatePost(mockReq, mockRes);

  expect(payload.successful).toEqual(true);
  expect(payload.post).toEqual({});
});

test('delete_post_success', async () => {
  const mockId = 'abcd';
  const mockReq = { params: { id: mockId } };
  const mockRes = { json: (payload) => payload };

  jest.spyOn(Post, 'findOne').mockResolvedValueOnce({});
  jest.spyOn(Post, 'deleteOne').mockResolvedValueOnce();

  const payload = await deletePost(mockReq, mockRes);
  const isSuccessful = payload.successful;
  const post = payload.post;

  expect(isSuccessful).toEqual(true);
  expect(post).toEqual({});
});

test('list_posts_success', async () => {
  const mockUsername = 'abcd';
  const mockReq = { params: { username: mockUsername } };
  const mockRes = { json: (payload) => payload };

  jest.spyOn(Post, 'find').mockResolvedValueOnce([{}]);

  const payload = await listPosts(mockReq, mockRes);
  const isSuccessful = payload.successful;
  const posts = payload.posts;

  expect(isSuccessful).toEqual(true);
  expect(posts).toEqual([{}]);
});

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);
  return mockRes;
};
