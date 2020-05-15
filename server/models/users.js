const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Stock Schema.
let stockSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 5,
    unique: true
  },
  priceAtPurchase: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  currentPrice: {
    type: mongoose.Schema.Types.Decimal128,
    required: false,
  },
  quantityPurchased: {
    type: Number,
    required: true,
  }
});

// Base model for a user.
let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  balance: {
    type: mongoose.Schema.Types.Decimal128,
  },
  stocks: [stockSchema]
});

// Creating the hash of a password.
// https://www.npmjs.com/package/bcrypt
userSchema.pre('save', function saveHook(next) {
  const user = this;
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) next(err);
    this.password = hash;
    next();
  });
});

// Comparing passwords.
userSchema.methods.isValidPassword = function(passwordToVerify, callback) {
  const user = this;
  bcrypt.compare(passwordToVerify, this.password, callback);
};

// Add user schema to mongo.
const User = mongoose.model("User", userSchema);
const Stock = mongoose.model("Stock", stockSchema);
exports.User = User;
exports.Stock = Stock;