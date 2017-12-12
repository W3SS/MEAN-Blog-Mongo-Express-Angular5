const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load user model
const User = require('../models/user.model');

exports.postUser = function(req, res) {

    // Express validation
    req.checkBody('firstName', 'Name is required').notEmpty();
    req.checkBody('lastName', 'Last name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password', 'Passwords must be at least 5 characters long').isLength({ min: 8 })
    req.checkBody('password', 'Password must contain at least one number and one uppercase').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'i');
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors();

    if(errors){
        res.json({errors:errors});
    } else {
        // Save user
        const newUser = User(req.body);

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;

                newUser.save(newUser, (err, user) => {
                    if(err) {
                        res.send(err);
                    } else {
                        res.json({success: true, message: 'User saved', user});
                    }
                });
            });
        });
    }
}