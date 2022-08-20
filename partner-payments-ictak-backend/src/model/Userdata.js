const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ICTAK')
    .then((success)=> {
        console.log('DB Connected')
    })
    .catch((err)=> {
        console.log('DB Connect failed')
    });

const Schema = mongoose.Schema;


var UserSchema = new Schema({
    fullname : String,
    email: {
        type:String,
        unique: true,
        index: true
    },
    password: String,
    usertype : String
});

var Userdata = mongoose.model('UserDetail',UserSchema);

module.exports = Userdata;