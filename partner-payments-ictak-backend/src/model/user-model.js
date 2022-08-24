const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname : String,
    email: {
        type: String,
        unique: true,
        index: true
    },
    password: String,
    userType : String,
    adminapproved : Boolean
});

var userData = mongoose.model('UserData',UserSchema);

module.exports = userData;