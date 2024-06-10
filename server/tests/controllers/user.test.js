require('dotenv').config();

const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const { createUser, loginUser } = require('../../src/controllers/user');
const User = require('../../src/models/user');

test('when_Create_User_Success_Username_Encrypted_In_Token', async () => {
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

test('when_Login_Success_Username_Encrypted_In_Token', async () => {
  const mockUsername = 'abcd';
  const mockPassword = 'efgh';
  const mockBody = { username: mockUsername, password: mockPassword };
  const mockReq = { body: mockBody };
  const mockRes = { json: (payload) => payload };

  jest.spyOn(User, 'findOne').mockResolvedValueOnce({});
  jest.spyOn(argon2, 'verify').mockResolvedValueOnce({});

  const payload = await loginUser(mockReq, mockRes);
  const isSuccessful = payload.successful;
  const token = payload.token;
  const username = jwt.decode(token).username;

  expect(username).toEqual(mockUsername);
  expect(isSuccessful).toEqual(true);
});
