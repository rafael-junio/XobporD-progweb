import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import authController from '../controller/auth';
import models from '../database/models';

exports.signIn = async (req, res, next) => {
  const userResult = await models.User.findOne({
    where: { email: req.body.email },
  });

  bcrypt.compare(req.body.password, userResult.password, (err, isMatch) => {
    if (isMatch) {
      res.cookie(
        process.env.COOKIE_NAME,
        cookieParser.signedCookie(
          authController.signToken(req.body.email),
          process.env.COOKIE_SECRET || 'secret',
        ),
        {
          httpOnly: true,
          expires: new Date(Date.now() + 3600000),
          signed: true,
        },
      );
      next();
    } else {
      const errors = [{ msg: 'Email/password does not match' }];
      res.render('login', { errors });
    }
  });
};

exports.signOut = async (req, res) => {
  res.clearCookie('xobpord');
  res.redirect('/login');
};
