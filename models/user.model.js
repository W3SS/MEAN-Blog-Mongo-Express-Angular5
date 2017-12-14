// Load dependencies
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Mongoose promise
mongoose.Promise = global.Promise;

// Create User schema
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

// User pre-save middleware
UserSchema.pre('save', function(next) {
    let newUser = this;

    // Hash password
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                newUser.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Custom UserSchema methods
UserSchema.statics.getUserById = function(id, callback){
    this.findById(id, callback);
};
UserSchema.statics.getUserByUsername = function(username, callback) {
    const query = {username: username};
    this.findOne(query, callback);
};
UserSchema.statics.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) {
            return err;
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);