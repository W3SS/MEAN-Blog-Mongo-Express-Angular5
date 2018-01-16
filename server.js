// Load dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const passport = require('passport');
const path = require('path');
const cors = require('cors');

const app = express();

// load config file
const config = require('./config/database');

// Port
const port = 8080;

// Load routes
const usersRoutes = require('./routes/users.routes');
const articlesRoutes = require('./routes/articles.routes');
const searchRoutes = require('./routes/search.routes');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Delete for production
app.use(cors({
    origin: 'http://localhost:4200'
}));

// Delete for production
app.use(morgan('dev'));

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

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Initialize express-validator
app.use(expressValidator());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport strategy
require('./config/passport.js')(passport);

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/articles', articlesRoutes);
app.use("/api/search", searchRoutes);
app.use('*', (req, res) => {
    res.send('Invalid Endpoint');
});

// Listen
app.listen(port, () => {
    console.log('App listening on port ' + port);
});