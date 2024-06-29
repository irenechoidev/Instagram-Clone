const argon2 = require('argon2');
const {
  createUser,
  loginUser,
  getUser,
} = require('../../src/controllers/user');
const User = require('../../src/models/user');
const { createToken } = require('../../src/utils/createToken');

beforeEach(() => {
  process.env = {
    TOKEN_SECRET: 'testSecret',
  };
});

test('when_Create_User_Success_Username_Encrypted_In_Token', async () => {
  const mockUsername = 'abcd';
  const mockPassword = 'efgh';
  const mockBody = { username: mockUsername, password: mockPassword };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(User, 'create').mockResolvedValue({});

  await createUser(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    token: createToken(mockUsername),
    successful: true,
  });
});

test('when_username_already_exists_409_conflict', async () => {
  const mockUsername = 'abcd';
  const mockPassword = 'efgh';
  const mockBody = { username: mockUsername, password: mockPassword };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(User, 'create').mockRejectedValue(new Error());

  await createUser(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(409);
  expect(mockRes.json).toBeCalledWith({
    token: '',
    successful: false,
  });
});

test('when_Login_Success_Username_Encrypted_In_Token', async () => {
  const mockUsername = 'abcd';
  const mockPassword = 'efgh';
  const mockBody = { username: mockUsername, password: mockPassword };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(User, 'findOne').mockResolvedValue({});
  jest.spyOn(argon2, 'verify').mockResolvedValue({});

  await loginUser(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    token: createToken(mockUsername),
    successful: true,
  });
});

test('when_Login_Returns_404_No_Token_In_Response', async () => {
  const mockUsername = 'abcd';
  const mockPassword = 'efgh';
  const mockBody = { username: mockUsername, password: mockPassword };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(User, 'findOne').mockResolvedValue(null);
  jest.spyOn(argon2, 'verify').mockResolvedValue({});

  await loginUser(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    token: '',
    successful: false,
  });
});

test('when_Login_Returns_401_No_Token_In_Response', async () => {
  const mockUsername = 'abcd';
  const mockPassword = 'efgh';
  const mockBody = { username: mockUsername, password: mockPassword };
  const mockReq = { body: mockBody };
  const mockRes = buildMockResponse();

  jest.spyOn(User, 'findOne').mockResolvedValue({});
  jest.spyOn(argon2, 'verify').mockResolvedValue(null);

  await loginUser(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(401);
  expect(mockRes.json).toBeCalledWith({
    token: '',
    successful: false,
  });
});

test('when_Get_User_Is_Successful', async () => {
  const mockUsername = 'abcd';
  const mockReq = { params: { username: mockUsername } };
  const mockRes = buildMockResponse();

  jest.spyOn(User, 'findOne').mockResolvedValue({});

  await getUser(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(200);
  expect(mockRes.json).toBeCalledWith({
    user: {},
    successful: true,
  });
});

test('when_User_Does_Not_Exist', async () => {
  const mockUsername = 'abcd';
  const mockReq = { params: { username: mockUsername } };
  const mockRes = buildMockResponse();

  jest.spyOn(User, 'findOne').mockResolvedValue(null);

  await getUser(mockReq, mockRes);

  expect(mockRes.status).toBeCalledWith(404);
  expect(mockRes.json).toBeCalledWith({
    user: null,
    successful: false,
  });
});

const buildMockResponse = () => {
  const mockRes = {};
  mockRes.json = jest.fn();
  mockRes.status = jest.fn(() => mockRes);
  return mockRes;
};
