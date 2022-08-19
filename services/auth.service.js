const jwt = require('jsonwebtoken');

const secret = 'jwtSecret';

const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret);

  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify,
  };
};

module.exports = authService;
