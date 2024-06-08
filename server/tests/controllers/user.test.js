require('dotenv').config();

const jwt = require('jsonwebtoken');
const { createUser } = require('../../src/controllers/user');
const User = require('../../src/models/user');

test('Test createUser', async () => {
  const mockUsername = 'abcd';
  const mockPassword = 'efgh';
  const mockBody = { username: mockUsername, password: mockPassword };
  const mockReq = { body: mockBody };
  const mockRes = { json: (payload) => payload };

  jest.spyOn(User, 'create').mockResolvedValueOnce({});

  const payload = await createUser(mockReq, mockRes);
  const isSuccessful = payload.successful;
  const token = payload.token;
  const username = jwt.decode(token).username;

  expect(username).toEqual(mockUsername);
  expect(isSuccessful).toEqual(true);
});
