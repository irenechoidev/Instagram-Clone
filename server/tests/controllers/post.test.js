const Post = require('../../src/models/post');
const {
  createPost,
  getPost,
  updatePost,
  deletePost,
  listPosts,
} = require('../../src/controllers/post');
const { mock } = require('node:test');

test('create_post_success', async () => {
  const mockUsername = 'abcd';
  const mockDescription = 'This is a fake description';
  const mockBody = { username: mockUsername, description: mockDescription };
  const mockReq = { body: mockBody };
  const mockRes = { json: (payload) => payload };

  jest.spyOn(Post, 'create').mockResolvedValueOnce({});

  const payload = await createPost(mockReq, mockRes);
  const isSuccessful = payload.successful;
  const post = payload.post;

  expect(post).toEqual({});
  expect(isSuccessful).toEqual(true);
});

test('get_post_success', async () => {
  const mockId = 'abcd';
  const mockReq = { params: { id: mockId } };
  const mockRes = { json: (payload) => payload };

  jest.spyOn(Post, 'findOne').mockResolvedValueOnce({});

  const payload = await getPost(mockReq, mockRes);

  expect(payload.successful).toEqual(true);
  expect(payload.post).toEqual({});
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
