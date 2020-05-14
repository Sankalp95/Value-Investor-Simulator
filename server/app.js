// Basic express declarations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const portNumber = 8080;
const passport = require('passport');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*")
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Connecting to mongo.
mongoose.connect('mongodb://localhost/stocksimulator')
  .then(() => console.log('Now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong', err));

// Passport setup.
const User = require('./models/users');
const passportSetup = require('./config/passport-setup.js');

// Test.
app.get('/api/', (req, res) => res.send('Hello World!'))

// Stock information.
const stockRoutes = require('./routes/stockRoutes');
app.use('/api/stocks/', stockRoutes);

// Authorisation information.
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth/', authRoutes);

// User information.
const userRoutes = require('./routes/userInfoRoutes');
app.use('/api/users/', passport.authenticate('jwt', { session : false }), userRoutes);

// Handle errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error : err });
});

// Start the server
app.listen(portNumber, () => console.log(`Server listening on port number: ${portNumber}`));