const jwt = require('jsonwebtoken');
const { createToken } = require('../../src/utils/createToken');

beforeEach(() => {
  process.env = {
    TOKEN_SECRET: 'testSecret',
  };
});

test('when_Creating_Token_Username_In_Jwt_Payload', () => {
  const mockUsername = 'abcd';
  const token = createToken(mockUsername);
  const payload = jwt.decode(token);

  expect(payload.username).toEqual(mockUsername);
});
