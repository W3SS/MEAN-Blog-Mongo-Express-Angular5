// Load dependencies
const express = require('express');
const router = express.Router();
const db = require('../config/database');
// Load Article model
const Article = require('../models/article.model');

router.route("/:search")
    .get((req, res) => {
        Article.find(
            {$text: {$search: req.query.title}}, 
            {score: {$meta: "textScore"}}
        ).sort({score:{$meta:"textScore"}})
        .exec((err, articles) => {
            if(err) {
                res.json(err)
            } else {
                res.json(articles)
            }
        });
    });

module.exports = router;