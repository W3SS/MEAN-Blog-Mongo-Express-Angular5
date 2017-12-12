const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const config = require('./config/database');
const port = 8080;

// Load routes
const authRoutes = require('./routes/auth.routes');

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect(
    config.uri, 
    {
        keepAlive: true,
        reconnectTries: Number.MAX_VALUE,
        useMongoClient: true
    },
    (err) => {
        if(err) {
            console.log('Failed to connect to database: ' + err);
        } else {
            console.log('Connected to database ' + config.db);
        };
    }
);

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize express-validator
app.use(expressValidator());

// Routes
app.use('/authentication', authRoutes);
app.use('*', (req, res) => {
    res.send('Invalid Endpoint');
});

app.listen(port, () => {
    console.log('App listening on port ' + port);
})