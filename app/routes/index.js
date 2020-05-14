import { Router } from 'express';
import authMiddleware from '../middleware/auth';
import userController from '../controller/users';

const router = Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/login', authMiddleware.signIn, (req, res) => {
  res.redirect('/users/home');
});

router.post('/logout', authMiddleware.signOut, (req, res) => {
  res.redirect('/login');
});

router.post('/register', async (req, res) => {
  const errors = [];
  const formContent = { name: req.body.name, email: req.body.email };
  if (
    req.body.password !== req.body.confirm_password
    || req.body.email !== req.body.confirm_email
    || req.body.email === ''
    || req.body.password === ''
  ) {
    errors.push({ msg: 'Email/password does not match' });
    res.render('register', { errors, formContent });
  } else {
    const userData = {};
    userData.email = req.body.email;
    userData.password = req.body.password;

    userController.register(userData);

    res.render('login', { errors, formContent });
  }
});
export default router;
