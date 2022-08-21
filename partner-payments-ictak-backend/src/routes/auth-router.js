const express = require(`express`);
const UserData = require(`../model/user-model`);
// const User = require('../model/user-model');

const authRouter = express.Router();

authRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
});

authRouter.post('/signin', (req,res)=>{
  let user = req.body

  UserData.findOne({
    $and: [{"email":user.email}, {"password":user.password}]
  }).then((user)=> {
      console.log(user);
      res.send(user);
    }).catch((err)=> {
      console.log(err);
    });
});

// authRouter.post(`/signin`, (req, res)=> {
//   // console.log(`POST: /signin - auth-router.js:12`, req.body);
//   var userName = req.body.userName.trim();
//   var passWord = req.body.passWord.trim();

//   UserData.find({'userName': userName})
//     .then((user)=> {
//       // console.log('auth-router.js:16 - succ', succ[0].userName);
//       if(user.length == 0) {
//         res.status(200).json({
//           status: false,
//           result: 'User Not found'
//         });
//       } else if(user[0].passWord != passWord) {
//         res.status(200).json({
//           status: false,
//           result: `Invalid Password`        
//         });
//       } else {
//         res.status(200).json({
//           status: true,
//           result: `Authenticated User` ,
//           user: user
//         });
//       }
//     }).catch((err)=> {
//       console.log('auth-router.js:16 - err', err);
//     });
// });

authRouter.post('/signup',function(req,res) {  /*verifyToken,/insert*/ 

  var user = {       
    name : req.body.fullname,
    email : req.body.email,
    password : req.body.password,
    usertype : req.body.usertype,
    adminapproved : false
  }

  var newUser = new UserData(user);  //create an instance of your model
  newUser.save() 
  .then((success)=> {
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