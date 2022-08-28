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
    adminapproved : Boolean,
    additionalqualification : String,
    address : String,
  
    gstnumber : String,
    heighestqualification: String,
    mobile : Number,
    pannumber : String,
    partnertype : String,
    workexperience  : String,
    skills : Array
});



var userData = mongoose.model('UserData',UserSchema);

module.exports = userData;
