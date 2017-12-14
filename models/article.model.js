// Load dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Article schema
const ArticleSchema = new Schema({
    title: String,
    excerpt: String,
    body: String,
    tags: [],
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Custom ArticleSchema methods
ArticleSchema.statics.getArticleById = function(id, callback){
    this.findOne(id, callback);
};
ArticleSchema.statics.getArticleByTitle = function(title, callback) {
    query = {title: title};
    this.findOne(query, callback);
};

// Export Article model
module.exports = mongoose.model('Article', ArticleSchema);