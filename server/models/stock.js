const mongoose = require('mongoose');

// Base model for a stock.
let stockSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5,
    unique: true
  },
  priceAtPurchase: {
    type: Int16Array,
    required: true,
  },
  quantityPurchased: {
    type: Int16Array,
    required: true,
  }
});

// Add user schema to mongo.
const Stock = mongoose.model("Stock", stockSchema);
exports.Stock = Stock;