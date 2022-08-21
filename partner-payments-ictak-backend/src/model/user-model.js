const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ictakuser1:BDuEr7h0j2F7wIM0@ppp.16ftfvb.mongodb.net/partner-payments?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((succ)=>{
  console.log(`MongoDB connected`);
}).catch((err)=> {
  console.log(`MongoDB connection error! Can't connect to ${mongoDbServer}`);
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
    userType : String,
    adminapproved : Boolean
});

var userData = mongoose.model('UserData',UserSchema);

module.exports = userData;
//mongodb+srv://ictakuser1:BDuEr7h0j2F7wIM0@ppp.16ftfvb.mongodb.net/partner-payments?retryWrites=true&w=majority
//BDuEr7h0j2F7wIM0