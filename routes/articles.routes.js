// Load dependencies
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Load Article model
const Article = require('../models/article.model');

// Articles routes
 router.route('/')
    // Get articles
    .get((req, res) => {
        Article.find({})
        .populate('author')
        .exec((err, articulos) => {
            if(err) {
                res.json(err)
            } else {
                res.json(articulos)
            }
        });
    })
    // Create article
    .post(passport.authenticate('jwt', {session:false}), (req, res) => {

        // Express validation
        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('body', 'Body is required').notEmpty();

        var errors = req.validationErrors();

        if(errors) {
            res.json({errors:errors});
        } else {
            // Save Article
            const newArticle = new Article({
                title: req.body.title,
                excerpt: req.body.excerpt,
                body: req.body.body,
                author: req.user._id,
                tags: req.body.tags
            });

            newArticle.save(newArticle, (err, article) => {
                if(err) {
                    res.send(err);
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

// Article routes
router.route('/:article_id')
    // Get article
    .get((req, res) => {
        Article.findById({_id: req.params.article_id})
        .populate('author')
        .exec((err, articulos) => {
            if(err) {
                res.json(err)
            } else {
                res.json(articulos)
            }
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
                });
            };
        });
    });

module.exports = router;