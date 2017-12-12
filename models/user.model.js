const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;
  
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

UserSchema.statics.getUserByUsername = function(username, callback) {
    const query = {username: username};
    this.findOne(query, callback);
}

UserSchema.statics.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) {
            return err;
        }
        callback(null, isMatch);
    });
}

UserSchema.statics.ensureAuthenticated = function(req, res, next) {
    //console.log(req)
    if(req.isAuthenticated()){
        return next();
    } else {
        //req.flash('error_msg', 'You are not logged in');
        res.redirect('/login')
    }
};

module.exports = mongoose.model('User', UserSchema)