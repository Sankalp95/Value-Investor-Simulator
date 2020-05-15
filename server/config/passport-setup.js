// For login / registration.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

// JWT. 
const jwt = require('jsonwebtoken');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const secretOrKey = 'top_secret';
const startingAmount = 100000; // 100k.

/**
 * Middleware for signup.
 */
passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
  }, (req, email, password, done) => {
    const user = new User();
    user.email = email || "";
    user.password = password || "";
    user.balance = startingAmount;
    user.save(err => {
        if (err) {
          return done(err);
        } else {                
          return done(null, user);
        }
    });
  }
));

/**
 * Middleware for login.
 */
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true,
}, (req, email, password, done) => {
  User.findOne({
      email: email
  }, (err, user) => {
      if (err) {          
          return done(err);
      } else if (!user) {
          const error = new Error("Incorrect email or password");
          error.name = "IncorrectCredentialsError";
          return done(error);
      } else {
        user.isValidPassword(password, (err, res) => {
          if (!res || err) {
              const error = new Error();
              error.name = "IncorrectCredentialsError";            
              return done(error);
          }
          let jwtPayload = {
              email: user.email,
          };
          let token = jwt.sign(jwtPayload, secretOrKey);
          let responsePayload = {
            email: user.email,
            token,
          };
          return done(null, responsePayload);
        });
      }
    });
  }
));


/**
 * Middleware for JWT verification.
 */
// We expect the user to send the token as a query paramater with the name 'secret_token'.
passport.use('jwt', new JWTstrategy({
  secretOrKey,
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, (token, done) => {
  return done(null, token);
}));