const Post = require('../../src/models/post');
const { createPost } = require('../../src/controllers/post');

test('create_post_success', async () => {
  const mockDescription = 'abcd';
  const mockBody = { description: mockDescription };
  const mockReq = { body: mockBody };
  const mockRes = { json: (payload) => payload };

  jest.spyOn(Post, 'create').mockResolvedValueOnce({});

  const payload = await createPost(mockReq, mockRes);
  const isSuccessful = payload.successful;
  const post = payload.post;

  expect(post).toEqual({});
  expect(isSuccessful).toEqual(true);
});
