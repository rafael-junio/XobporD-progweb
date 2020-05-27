import { Router } from 'express';
import passport from 'passport';
import upload from '../middleware/multer.config'
import uploadController from '../controller/upload'
import jwt from 'jsonwebtoken';

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
  
  var file = req.file
  const payload = jwt.verify(req.signedCookies['xobpord'], process.env.JWT_SECRET, {ignoreExpiration: true} );
  
  // console.log(req.signedCookies['xobpord']);
  // console.log(payload);
  
  if (!file) {
    console.log("No file received");
    
    message.push({ msg: 'Campo do arquivo vazio!' });
    res.render('home', { message })

  } else {
    console.log('file received');
    const fileData = {};

    fileData.fileName = file.originalname;
    fileData.uploadName = file.filename;
    fileData.type = file.mimetype;
    fileData.size = file.size;
    fileData.uploaded_by = payload['sub'];

    uploadController.register(fileData);

    message.push({ msg: 'Upload feito com sucesso' });
    res.render('home', { message })
  }
  // }
});
export default router;
