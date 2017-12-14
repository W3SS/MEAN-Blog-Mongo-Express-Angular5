// Load dependencies
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Load User model
const User = require('../models/user.model');

// Load config file
const config = require('../config/database');

// Export the function
module.exports = function(passport) {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.secret
    };

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        const jwt_user_id = jwt_payload._id;

        User.getUserById(jwt_payload._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}