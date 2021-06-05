const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email:{
        type: String, 
        require: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMongoose) // add on a username, making sure the username is not duplicated
module.exports = mongoose.model('User', userSchema);