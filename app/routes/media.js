import { Router } from 'express';
import fetch from 'node-fetch';
import passport from 'passport';
import mediaController from '../controller/media';

const router = Router();

router.get('/search', (req, res) => {
  res.render('search', { title: 'Search' });
});

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

router.post(
  '/search',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    mediaController.search(req, res);
  });

export default router;
