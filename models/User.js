const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("password", salt);

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    password: {

        type: String,
        required: true
    },
    avatar: {

        type: String,
        required: true
    }
});
//signup
userSchema.methods.hashPasswords = function(password) {

    return bcrypt.hashSync(password, salt);
};
//login 
userSchema.methods.comparePasswords = function(password, hash) {

    return bcrypt.compareSync(password, hash);
};


let User = mongoose.model('User', userSchema, 'users');

module.exports = User;