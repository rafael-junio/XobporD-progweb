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
    res.render('home');
  },
);

router.post('/home', upload.single('file'), async (req, res) => {
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

    uploadController.register(fileData);

    message.push({ msg: 'Upload feito com sucesso' });
    res.render('home', { message });
  }
});
export default router;
