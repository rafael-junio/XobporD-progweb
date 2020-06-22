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
    let result;
    return res.render('upload', {result});
  },
);

router.post(
  '/home',
  upload.single('file'),
  async (req, res) => {
  const message = [];

  const { file } = req;
  const payload = jwt.verify(
    req.signedCookies.xobpord,
    process.env.JWT_SECRET,
    { ignoreExpiration: true },
  );

  if (!file) {
    message.push({ msg: 'Campo do arquivo vazio!' });
    res.render('home', { message });
  } else {
    console.log('file received');
    const fileData = {};

    fileData.fileName = file.originalname;
    fileData.uploadName = file.filename;
    fileData.type = file.mimetype;
    fileData.size = file.size;
    fileData.uploadedBy = payload.sub;
    fileData.idTMDB = req.body.idTMDB;
    fileData.tag = req.body.typeMedia;

    uploadController.register(fileData);

    message.push({ msg: 'Upload feito com sucesso' });
    uploadController.showAll().then(result => {
      return res.render('home', { message, result });
    })
  }
});
export default router;
