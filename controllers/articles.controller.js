// Load dependencies
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Load Article model
const Article = require('../models/article.model');

const config = require('../config/database');

exports.deleteArticle = function() {
    console.log('delete article')
}