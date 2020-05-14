const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');

/**
 * Used to post a new user.
 */
router.post('/signup', passport.authenticate('signup', { session : false }), (req, res, next) => {
  res.json({ 
    message : 'Signup successful',
    user : req.user 
  });
});

/**
 * Login 
 */
router.post('/login', passport.authenticate('login', { session: false }), (req, res, next) => {
  res.json(req.user);
});

module.exports = router;