const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Load Article model
const Article = require('../models/article.model');

// Load Articles controller
const articlesController = require('../controllers/articles.controller');

router.route('/')
    // Get articles
    .get((req, res) => {
        Article.find({}, (err, articles) => {
            if(err) {
                res.send(err);
            } else {
                res.json(articles);
            };
        });
    })
    // Create article
    .post(passport.authenticate('jwt', {session:false}), (req, res) => {
        
        // Express validation
        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('body', 'Body is required').notEmpty();

        var errors = req.validationErrors();

        if(errors) {
            res.json({errors:errors})
        } else {
            // Save Article
            let newArticle = Article(req.body);

            newArticle.save(newArticle, (err, article) => {
                if(err) {
                    res.send(err)
                } else {
                    res.json({
                        success: true,
                        message: 'Article saved',
                        article: article
                    });
                };
            });
        };
    });

router.route('/:article_id')
    // Get article
    .get((req, res) => {
        Article.findById({_id: req.params.article_id}, (err, article) => {
            if(err) {
                res.send(err);
            } else {
                res.json(article);
            };
        });
    })
    // Update article
    .put(passport.authenticate('jwt', {session:false}), (req, res) => {
        Article.findByIdAndUpdate({_id: req.params.article_id}, req.body, (err, article) => {
            if(err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Article updated',
                    article: article
                });
            };
        });
    })
    // Delete article
    .delete(passport.authenticate('jwt', {session:false}), (req, res) => {
        Article.findByIdAndRemove({_id: req.params.article_id}, (err, article) => {
            if(err) {
                res.send(err);
            } else {
                res.json({
                    success: true,
                    message: 'Article deleted',
                    article: article
                })
            }
        })
    });

module.exports = router;