const Post = require('../../src/models/post');
const {
  createPost,
  getPost,
  updatePost,
} = require('../../src/controllers/post');

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
