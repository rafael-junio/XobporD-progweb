import createError from 'http-errors';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import dotenv from 'dotenv';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users';
import indexRouter from './routes/index';
import mediaRouter from './routes/media';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: 'config/.env.test',
  });
} else if (process.env.NODE_ENV === 'production') {
  dotenv.config({
    path: 'config/.env.prod',
  });
} else {
  dotenv.config({
    path: 'config/.env.local',
  });
}

const app = express();

app.set('port', process.env.PORT_SERVE || 3000);
app.use(cookieParser(process.env.COOKIE_SECRET || 'secret'));
require('./config/passport');

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/media', mediaRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  createError(404);
  res.render('404');
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('500', { message: err.message, error: err });
});

module.exports = app;
