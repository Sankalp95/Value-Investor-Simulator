const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Stock = mongoose.model('Stock');

/**
 * Get user information.
 */
router.get('/profile', (req, res, next) => {
  User.findOne({ email: req.user.email }, (err, user) => {
    if (err || !user) {
      res.status(400).json({
        success: false,
        user: null
      });
    } else {
      res.status(200).json({
        success: true,
        user,
      });
    }
  });
});

/**
 * Add a new stock for a user.
 */
router.post('/stock', (req, res, next) => {
  User.findOne({ email: req.user.email }, function(err, user) {    
    if (err || !user) {
      res.status(400).json({
        success: false,
        user: null
      });
    } else {
      stock = new Stock();
      stock.ticker = req.body.ticker;
      stock.priceAtPurchase = req.body.priceAtPurchase;
      stock.quantityPurchased = req.body.quantityPurchased;
      user.stocks.push(stock);
      user.save(err => {
        if (err) {
          res.status(400).json({
            success: false,
            error: err
          });
        } else {                
          res.status(200).json({
            success: true,
            error: null
          });
        }
      });
    }
  });
});

module.exports = router;