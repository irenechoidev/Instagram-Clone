const jwt = require('jsonwebtoken');

exports.createToken = (username) => {
  const tokenSecret = process.env.TOKEN_SECRET;
  const token = jwt.sign({ username }, tokenSecret, { expiresIn: '3d' });

  return token;
};
