let passport = require('passport');
let localStrategy = require('passport-local').Strategy;
var users = require('./models/users');
var jwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

exports.local = passport.use(new localStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());

exports.getToken = function(user) {
    console.log(`   ---- GetToken:`, user);
    return jwt.sign(user, config.secretKey, 
        {expiresIn: 583600});
}

var opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new jwtStrategy(opts,
    (jwt_payload, done) => {
        // console.log('JWT payload: ', jwt_payload);
        users.findById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            } else if (user) {
                return done(null, user);
            } else {
                console.log('    jwtPassport nor error neither user');
                return done(null, false);
            }
        })
    }));

//verify authentication vanilla
exports.verifyUser = passport.authenticate(
    'jwt',
    {session: false}
);

//to debug verifyUser function call printing messages about auth parameters
exports.verifyUserDebug = function(req, res, next) {
    passport.authenticate(
        'jwt',
        { session: false },
        (err, decryptToken, jwtError) => {
            console.log('    verifyUser - err:', err);
            console.log('    verifyUser - decrypToken:', decryptToken);
            console.log('    verifyUser - jwtError:', jwtError);
            if (jwtError != void(0) || err != void(0)) {
                var err = new Error('You are not authenticated! (verifyUserDebug)');
                err.status = 403;
                return next(err);
            }
            req.user = decryptToken;
            next();
        }
    )(req, res, next);
}

exports.verifyAdmin = function(req, res, next) {
    passport.authenticate(
        'jwt',
        { session: false },
        (err, decryptToken, jwtError) => {
            //this is the standar answer from passport.authenticate
            //user is authenticated if err and jwtError are null
            //decryptToken contains user document, which was decrypted from token
            // console.log('    verifyAdmin - err:', err);
            // console.log('    verifyAdmin - decrypToken:', decryptToken);
            // console.log('    verifyAdmin - jwtError:', !!jwtError);
            if (jwtError != void(0) || err != void(0)) {
                var err = new Error('You are not authenticated!');
                err.status = 403;
                return next(err);
            }
            //copy user document into req.user
            req.user = decryptToken;

            //check for admin flag for the user
            if (req.user.admin) {
                // console.log('  verifyAdmin: ok!');
                return next();
            } else {
                //since this is not an admin user, reply with 403/not authorized
                // console.log('  verifyAdmin: not admin');
                err = new Error(`You are not authorized to perform this operation (${req.user.username} - ${req.user.admin})`);
                res.statusCode = 403;
                return next(err);
            }
        }
    )(req, res, next);
}

///user 1
// var User = require('../models/user');
// var jwt = require('jsonwebtoken'); 
// var config = require('../config.js');

// exports.verifyOrdinaryUser = function (req, res, next) {
//     /
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];

    
//     if (token) {
        
//         jwt.verify(token, config.secretKey, function (err, decoded) {
//             if (err) {
//                 var err = new Error('You are not authenticated!');
//                 err.status = 401;
//                 return next(err);
//             } else {
               
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//     } else {
     
//         var err = new Error('No token provided!');
//         err.status = 403;
//         return next(err);
//     }
// };

// exports.verifyAdmin = function (req, res, next) {
    
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];

    
//     if (token) {
       
//         jwt.verify(token, config.secretKey, function (err, decoded) {
//             if (err) {
//                 var err = new Error('You are not authenticated!');
//                 err.status = 401;
//                 return next(err);
//             } else {
                
//                 req.decoded = decoded;

//                 if (req.decoded._doc.admin){
//                     next();
//                 }else{
//                     var err = new Error('You are not authorized to perform this operation!');
//                     err.status = 403;
//                     return next(err);
//                 }
//             }

//         });
//     } else {
     
//         var err = new Error('No token provided!');
//         err.status = 403;
//         return next(err);
//     }
// };

