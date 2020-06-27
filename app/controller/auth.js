import jwt from 'jsonwebtoken';

exports.signToken = (email) => jwt.sign(
  {
    iss: 'xobpord',
    sub: email,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + (5 * (60*60*10**3))),
  },
  process.env.JWT_SECRET || 'JWT_SECRET',
);
