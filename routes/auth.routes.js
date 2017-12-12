// Load dependencies
const express = require('express');
const router = express.Router();

// load users controller
const authController = require('../controllers/auth.controller');

// Load user model
const User = require('../models/user.model');

router.route('/register')
    .post(authController.postUser)

router.route('/login')
    .post()

module.exports = router;