const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    fullname : String,
    email: String,
    userType : String,
    adminapproved : Boolean,
});

var userList = mongoose.model('UserData',UserSchema);

module.exports = userList;