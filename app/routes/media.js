import { Router } from 'express';
import passport from 'passport';
import mediaController from '../controller/media';

const router = Router();

router.get(
  '/download/:idFile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    mediaController.sendFileGz(req, res, next);
  },
);

router.get(
  '/play/:idFile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.render('play', { idFile: req.params.idFile });
  },
);

router.get(
  '/stream/:idFile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    mediaController.sendFile(req, res, next);
  },
);

router.get(
  '/delete/:idFile',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    mediaController.deleteFile(req, res, next);
  },
);

router.post(
  '/upload/search',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    mediaController.search(req, res, next);
  },
);

export default router;
