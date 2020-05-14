const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * Used to search for a particular company. 
 */
router.get('/', (req, res) => {
  // Search input should be in the request body.
  searchInput = req.query.ticker;

  // Make the external API call to fetch the results of the search.
  axios.get('https://www.alphavantage.co/query', {
    params: {
        "function": "SYMBOL_SEARCH",
        "keywords": searchInput,
        "apikey": "KEMQTTFIOVYSMYLT"
    }
  }).then(response => {        
      res.status(200).json(response.data);
  }).catch(err => {
      res.status(500).send(err);
  });
});

/**
 * Used to get the daily prices of a stock.
 */
router.get('/timeSeriesDaily/', (req, res) => {
  // Search input should be in the request body.
  ticker = req.query.ticker;

  // Make the external API call to fetch the data.
  axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=1K4M0UHDF2UC8DEC`)
  .then(response => {
      res.status(200).json(response.data);
  }).catch(err => {
      res.status(500).send(err);
  });
});

module.exports = router;