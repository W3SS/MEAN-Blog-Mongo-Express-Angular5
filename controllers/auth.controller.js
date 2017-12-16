// Load dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Load User model
const User = require('../models/user.model');

// Load config
const config = require('../config/database');

// Register user
exports.registerUser = function(req, res) {
    // Validation
    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Passwords must be at least 8 characters and maximum 35 characters long').isLength({ min: 8, max:35 })
    req.checkBody('password', 'Password must contain at least one number and one uppercase').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'i');
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors();

    if(errors){
        //res.json({errors:errors});
        res.json({success: false, message: 'There are some errors in the form'});
    } else {
        // Save new User
        const newUser = User(req.body);

        newUser.save(newUser, (err, user) => {
            if(err) {
                if(err.code === 11000) {
                    res.json({ success: false, message: 'Username or email already exist' });
                } else {
                    res.json({success: false, message: 'There was an error'});
                }
            } else {
                res.json({
                    success: true, 
                    message: 'You are now registered',
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email
                    }
                });
            };
        });
    };
};

// Authenticate user
exports.authenticateUser = function(req, res) {

    // Express validation
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();

    if(errors){
        res.json({errors:errors});
    } else {
        const username = req.body.username;
        const password = req.body.password;

        User.getUserByUsername(username, (err, user) => {
            if(err) {
                res.json({success: false, message: 'There was an error'});
            } if(!user) {
                res.json({success: false, message: 'User not found'});
            } else {
                // Check user password
                User.comparePassword(password, user.password, (err, isMatch) => {
                    if(err){
                        return res.send(err);
                    }
                    if(isMatch){
                        // Create token
                        const token = jwt.sign(user.toJSON(), config.secret, {
                            expiresIn: 86400 // 1 day in seconds
                        });
                        res.json({
                            success: true,
                            message: 'User authenticated',
                            token: 'Bearer ' + token,
                            user: {
                                id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                username: user.username,
                                email: user.email
                            }
                        });
                    } else {
                        res.json({success: false, message: 'Wrong password'});
                    };
                });
            };
        });
    };
};