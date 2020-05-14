const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Stock = mongoose.model('Stock');
const axios = require('axios');

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

router.post('/stock', (req, res, next) => {
  let filter = { email: req.user.email };

  stock = new Stock();
  stock.ticker = req.body.ticker;
  stock.priceAtPurchase = req.body.priceAtPurchase;
  stock.quantityPurchased = req.body.quantityPurchased;
  let doc = { stocks: [stock] }
  User.updateOne(filter, doc, (err, updateRes) => {
    if (err) {
      res.status(400).json({
        success: false,
        error: err,
        nModifed: updateRes.nModifed,
      });    
    } else {
      res.status(200).json({
        success: true,
        error: null,
        nModifed: updateRes.nModifed,
      });
    }
  });
});

module.exports = router;