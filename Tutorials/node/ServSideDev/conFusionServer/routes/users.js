var express = require('express');
const bodyParser = require('body-parser');
var Users = require('../models/users');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

var router = express.Router();
router.use(bodyParser.json());

router.options('*', cors.corsWithOptions, (req, res, next) => {
  res.statusCode = 200;
});

//get defined users - passport auth
// only admin users can access it
router.get('/', cors.corsWithOptions, authenticate.verifyAdmin, (req, res, next) => {
  Users.find({})
  .then((users) => {
      res.statusCode = 200;
      res.setHeader('Context-Type', 'application/json');
      res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});

//post a new user - passport auth
// only admin users can access it
router.post('/signup', cors.corsWithOptions, (req, res, next) => {
  Users.register(new Users({username: req.body.username}),
  req.body.password, (err, user) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    } else {
      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }
      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      }
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration successful'});
        });
      });
    }
  });
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: true,
        status: 'Loggin unsucessfull!',
        err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({
          success: false,
          status: 'Loggin Unsuccessful!',
          err: 'Could not find user'});
      }

      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({
        success: true,
        status: 'Loggin successful!',
        token: token});
    });
  }) (req, res, next);
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error('You are not logged in.');
    err.status = 403;
    return next(err);
  }
});

router.get('/checkJWTToken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    } else {
      res.statusCode = 20;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});
    }
  }) (req, res);
});

module.exports = router;

// signing up with local authentication
// router.post('/signup', (req, res, next) => {
//   Users.findOne({username: req.body.username})
//   .then((user) => {
//     if (user != null) {
//       var err = new Error(`User ${req.body.username} already exists!`);
//       err.status = 403;
//       return next(err);
//     } else {
//       Users.create({
//         username: req.body.username,
//         password: req.body.password
//       })
//       .then((user) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json({status: 'Registration successful', user: user})
//       }, (err) => next(err));
//     }
//   })
//   .catch((err) => next(err));
// });

// local authentication
// router.post('/login', (req, res, next) => {
//   if (!req.session.user) {
//     let authHeader = req.headers.authorization;
//     if (!authHeader) {
//       var err = new Error('You are not authenticated!');
  
//       res.setHeader('WWW-Authenticate', 'Basic');
//       err.status = 401;
//       return next(err);
//     }
//     console.log('Auth type: ',authHeader.split(' ')[0]);
//     let credentials = new Buffer
//       .from(authHeader
//       .split(' ')[1], 'base64')
//       .toString()
//       .split(':');
//     let username = credentials[0];
//     let password = credentials[1];
//     console.log(`Credentials: usr=${username} pwd=${password}`);

//     Users.findOne({username: username})
//     .then((user) => {
//       if (user == null) {
//         var err = new Error(`User ${username} does not exist`);
//         err.status = 403;
//         return next(err);
//       } else if (user.password !== password) {
//         var err = new Error(`Wrong credentials! ('${password}')`);
//         err.status = 403;
//         return next(err);
//       } else if (user.username === username && user.password === password) {
//         req.session.user = 'authenticated';
//         res.statusCode = 200;
//         res.setHeader('Content-Type','text/plain');
//         res.end('You are authenticated!');
//       }
//     })
//     .catch((err) => next(err));
//   } else {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('You are already authenticated!');
//   }
// });