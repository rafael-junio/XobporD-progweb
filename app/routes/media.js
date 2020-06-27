import { Router } from 'express';
import passport from 'passport';
import mediaController from '../controller/media';

const router = Router();

router.get(
  '/download/:idFile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    mediaController.sendFileGz(res, req.params.idFile);
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
  (req, res) => {
    mediaController.sendFile(req, res);
  });

router.get(
  '/delete/:idFile',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    mediaController.deleteFile(req, res);
  });

router.post(
  '/upload/search',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    mediaController.search(req, res);
  });

export default router;
