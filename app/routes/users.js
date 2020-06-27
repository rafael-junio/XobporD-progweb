import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import upload from '../middleware/multer.config';
import uploadController from '../controller/upload';

const router = Router();

router.get(
  '/home',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    uploadController.showAll().then(result => {
      return res.render('home', { result });
    })
  },
);

router.get(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    return res.render('upload', { result: undefined });
  },
);

router.post(
  '/upload',
  passport.authenticate('jwt', { session: false }),
  upload.single('file'),
  async(req, res) => {
    const payload = await jwt.verify(
      req.signedCookies.xobpord,
      process.env.JWT_SECRET,
      { ignoreExpiration: true },
    );

    uploadController.register(req, res, payload);
  });

export default router;
