// Load dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');

// load users controller
// const usersController = require('../controllers/users.controller');

// Load user model
const User = require('../models/user.model');

router.route('/register').post((req, res) => {
    
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
                res.json({success: true, message: 'User saved', user});
            }
        });
    }
});

router.route('/authenticate')
    .post((req, res, next) => {
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
                        token: 'JWT '+token,
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
    });

// Profile
router.get('/dashboard', passport.authenticate('jwt', {session:false}), (req, res) => {
    res.send('It worked! User id is: ' + req.user._id + '.');
});

module.exports = router;