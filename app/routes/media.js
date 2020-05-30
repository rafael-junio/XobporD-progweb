import { Router } from 'express';
import fetch from 'node-fetch';
import passport from 'passport';
import mediaController from '../controller/media';

const router = Router();

const baseUrl = 'https://api.themoviedb.org/3/';
const APIKEY = 'e62f38436c5bc1ea1190c1515047e3f4';

/**
 * Exempo de URL
 * "https://api.themoviedb.org/3/search/movie?api_key=e62f38436c5bc1ea1190c1515047e3f4&language=en-US&query=twilight&page=1&include_adult=false"
 */

router.get('/', (req, res) => {
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
    mediaController.sendFile(res, req.params.idFile);
  },
);

router.post('/search', (req, resp) => {
  const { title, typeMedia, language } = req.body;

  if (typeMedia === 'movie') {
    fetch(
      `${baseUrl}search/movie?api_key=${APIKEY}&language=${language}&query=${title}`,
    )
      .then((res) => res.json())
      .then((movies) => {
        resp.render('searchMovie', { title: 'Movies', movies });
      });
  } else if (typeMedia === 'tv') {
    fetch(
      `${baseUrl}search/tv?api_key=${APIKEY}&language=${language}&page=1&query=${title}`,
    )
      .then((res) => res.json())
      .then((tvShow) => {
        resp.render('searchTV', { title: 'Movies', tvShow });
      });
  }
});

export default router;
