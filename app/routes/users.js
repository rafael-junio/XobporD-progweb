import { Router } from 'express';
import passport from 'passport';
import upload from '../middleware/multer.config'
import uploadController from '../controller/upload'
const router = Router();

router.get(
  '/home',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.render('home');
  },
);


router.post('/home', upload.single('file'), async (req, res) => {
  const errors = [];
  console.log(req.file);
  var file = req.file
  const message = [];

  if (!file) {
    console.log("No file received");
    
    message.push({ msg: 'Campo do arquivo vazio!' });
    res.render('home', { message })

  } else {
    console.log('file received');
    const fileData = {};

    fileData.name = file.originalname;
    fileData.type = file.mimetype;
    fileData.size = file.size;
    fileData.uploaded_by = 'rafael';
    fileData.data = file.buffer;

    uploadController.register(fileData);

    message.push({ msg: 'Upload feito com sucesso' });
    res.render('home', { message })
  }
  // }
});
export default router;
