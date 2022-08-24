const express = require(`express`);
const UserData = require(`../model/user-model`);
// const User = require('../model/user-model');

const authRouter = express.Router();

authRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
});

authRouter.post(`/signin`, (req, res)=> {
  var email = req.body.email.trim();
  var password = req.body.password.trim();

  UserData.find({"email":email})
    .then((user)=> {
      if(user.length == 0) {
        res.status(200).json({
          success: false,
          message: 'User Not found'
        });
      } else if(user[0].password != password) {
        res.status(200).json({
          success: false,
          message: `Invalid Password`        
        });
      } else {
        res.status(200).json({
          success: true,
          message: `Authenticated User` ,
          user: user[0]
        });
      }
    }).catch((err)=> {
      console.log('auth-router.js:16 - err', err);
    });
});

authRouter.post('/signup',function(req,res) {  /*verifyToken,/insert*/ 

  var user = {       
    name : req.body.fullname,
    email : req.body.email,
    password : req.body.password,
    userType : req.body.userType,
    adminapproved : false
  }

  var newUser = new UserData(user);  //create an instance of your model
  newUser.save() 
  .then((success)=> {
    console.log('New User added')
    res.status(200).json({
      success: true,
      message: 'User Addition Successfull'
    });
  })
  .catch((err)=> {
    res.json({
      success: false,
      message: `${err.code==11000 ? 'Email ID already registered' : 'Add user failed'}`,
    });
  });
});

module.exports = authRouter;