const express = require('express');
const router = express.Router();
const axios = require('axios');

/**
 * Used to search for a particular company. 
 */
router.get('/searchForStock/', (req, res) => {
    // Search input should be in the request body.
    searchInput = req.body.ticker;

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
        res.send(err);
    });
});

module.exports = router;