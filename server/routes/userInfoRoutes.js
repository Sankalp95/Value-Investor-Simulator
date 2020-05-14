const express = require('express');
const router = express.Router();

/**
 * Get user information.
 */
router.get('/profile', (req, res, next) => {
  res.json({
    email : req.user.email,
    token : req.query.secret_token
  })
});

module.exports = router;