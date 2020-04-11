var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fileStore = require('session-file-store')(session);
var passport = require('passport');
var autheticate = require('./authenticate');
var config = require('./config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');
var uploadRouter = require('./routes/uploadRouter');
var favoriteRouter = require('./routes/favoriteRouter');

const mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

const url = config.mongoUrl;
const connect = mongoose.connect(url, { useNewUrlParser: true, useFindAndModify: false });

connect.then((db) => {
  console.log('Connected correctly to mongoDB server');
});

var app = express();

app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    res.redirect(307,
      'https://' + 
      req.hostname + 
      ':' + 
      app.get('secPort') + 
      req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));

//sessions is not used with passport-auth
// app.use(session({
//   name: 'session-id',
//   secret: '12345-67890-09876-54321',
//   saveUninitialized: false,
//   resave: false,
//   store: new fileStore()
// }));

app.use(passport.initialize());
// app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use(auth);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload', uploadRouter);
app.use('/favorites', favoriteRouter);

//to catch errors uploading files
app.use(function (err, req, res, next) {
  console.log('Error in ->', err.field);
  next(err);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function auth(req, res, next) {
  //auth with passport local
  console.log('Headers session: ', req.session);
  if (!req.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  } else {
    next();
  }
}

function auth3(req, res, next) {
  //auth with store and authentication on login page
  console.log('Headers session: ', req.session);
  if (!req.session.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  } else {
    if (req.session.user === 'authenticated') {
      next();
    } else {
      var err = new Error('You are not autheticated!');
      err.status = 403;
      next(err);
    }
  }
}

function auth2(req, res, next) {
  //auth with store
  console.log('Headers session: ', req.session);

  if (!req.session.user) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
  
      res.setHeader('www-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    console.log('Auth type: ',authHeader.split(' ')[0]);
    let credentials = new Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString().split(':');
    let username = credentials[0];
    let password = credentials[1];
    console.log(`User: ${username} Password: ${password}`);
    if (username === 'admin' && password === 'password') {
      req.session.user = 'admin';
      next();
    } else {
      var err = new Error('Wrong credentials!');

      res.setHeader('www-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  } else {
    if (req.session.user === 'admin') {
      next();
    } else {
      var err = new Error('Wrong cookie credentials!');

      err.status = 401;
      next(err);
    }
  }
}

function auth1(req, res, next) {
  //auth with just Cookie, without store
  console.log('Headers signedCookies: ', req.signedCookies);

  if (!req.signedCookies.user) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error('You are not authenticated!');
  
      res.setHeader('www-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    console.log('Auth type: ',authHeader.split(' ')[0]);
    let credentials = new Buffer.from(authHeader.split(' ')[1], 'base64')
        .toString().split(':');
    let username = credentials[0];
    let password = credentials[1];
    console.log(`User: ${username} Password: ${password}`);
    if (username === 'admin' && password === 'password') {
      res.cookie('user','admin', { signed: true });
      next();
    } else {
      var err = new Error('Wrong credentials!');

      res.setHeader('www-Authenticate', 'Basic');
      err.status = 401;
      next(err);
    }
  } else {
    if (req.signedCookies.user === 'admin') {
      next();
    } else {
      var err = new Error('Wrong cookie credentials!');

      err.status = 401;
      next(err);
    }
  }
}

module.exports = app;