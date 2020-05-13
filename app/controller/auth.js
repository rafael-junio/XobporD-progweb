import jwt from 'jsonwebtoken';

exports.signToken = (email) => jwt.sign(
  {
    iss: 'xobpord',
    sub: email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 3600000),
  },
  process.env.JWT_SECRET || 'JWT_SECRET',
);
