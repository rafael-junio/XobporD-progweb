import passportJWT from 'passport-jwt';
import passport from 'passport';
import models from '../database/models';

const JwtStrategy = passportJWT.Strategy;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.signedCookies;
    token = token[process.env.COOKIE_NAME];
  }
  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET || 'JWT_SECRET',
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        const userResult = await models.User.findOne({
          where: { email: payload.sub },
        });
        if (!userResult) {
          return done(null, false);
        }
        req.user = userResult;
        return done(null, userResult);
      } catch (error) {
        return done(error, false);
      }
    },
  ),
);
