const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Load User model
const User = require('../models/user.model');

// Load config
const config = require('../config/database');

/*===========================
    Registration
============================*/
// Register user
exports.registerUser = function(req, res) {
        
    // Express validation
    req.checkBody('firstName', 'First name is required').notEmpty();
    req.checkBody('lastName', 'Last name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Passwords must be at least 8 characters long').isLength({ min: 8 })
    req.checkBody('password', 'Password must contain at least one number and one uppercase').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'i');
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors();

    if(errors){
        res.json({errors:errors});
    } else {
        // Save new user
        let newUser = User(req.body);

        newUser.save(newUser, (err, user) => {
            if(err) {
                res.send(err);
            } else {
                res.json({
                    success: true, 
                    message: 'User saved',
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        });
    }
}
/*===========================
    Authentication
============================*/
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
                res.json(err);
            } if(!user) {
                res.json({success: false, message: 'User not found'})
            }

            User.comparePassword(password, user.password, (err, isMatch) => {
                if(err){
                    return res.send(err);
                }
                if(isMatch){
                    // JWT
                    const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800 // 1 week
                    });
                        res.json({
                        success: true,
                        message: 'User autehnticated',
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
                }
            });
        })
    }
}