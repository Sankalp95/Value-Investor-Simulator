// Basic express declarations
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const portNumber = 8080;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/', (req, res) => res.send('Hello World!'))

// Stock information.
const stockRoutes = require('./routes/stocks');
app.use('/api/stocks/', stockRoutes);

// Start the server
app.listen(portNumber, () => console.log(`Server listening on port number: ${portNumber}`));