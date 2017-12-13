// Load dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Load config
const config = require('../config/database');

// Load user model
const User = require('../models/user.model');

// Load user controller
const authController = require('../controllers/auth.controller');

/*===========================
    Authentication routes
============================*/

// Register user
router.route('/register')
    .post(authController.registerUser);

// Authenticate user
router.route('/authenticate')
    .post(authController.authenticateUser);


/*===========================
    Users routes
============================*/

router.route('/')
    // Get users
    .get(passport.authenticate('jwt', {session:false}), (req, res) => {
        User.find({}, (err, users) => {
            if(err) {
                return err;
            } else {
                res.json(users);
            }
        })
    })

router.route('/:user_id')
    // View user
    .get(passport.authenticate('jwt', {session:false}), (req, res) => {
        User.findById({_id: req.params.user_id}, (err, user) => {
            if(err) {
                return err;
            } else {
                res.json({
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        })
    })
    // Update user
    .put(passport.authenticate('jwt', {session:false}), (req, res) => {
        // Hash password
        const password = req.body.password;
        req.body.password = bcrypt.hashSync(password);

        User.findByIdAndUpdate({ _id: req.params.user_id }, req.body, { 'new': true }, (err, user) => {
            if(err) {
                return err;
            } else {
                res.json({
                    success: true,
                    message: 'User updated',
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
    })
    // Delete user
    .delete(passport.authenticate('jwt', {session:false}), (req, res) => {
        User.findByIdAndRemove({ _id: req.params.user_id }, (err, user) => {
            if(err) {
                return err;
            } else {
                res.json({
                    success: true,
                    message: 'User deleted',
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        })
    });

module.exports = router;