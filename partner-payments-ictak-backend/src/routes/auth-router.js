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
  // console.log(req.body);

  var user = {       
    fullname : req.body.name,
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

authRouter.post('/updateProfile',function(req,res) {  /*verifyToken,/insert*/ 
  console.log('router. updateProfile');
  console.log(req.body)
  id=req.body._id;
//userType

additionalqualification = req.body.additionalqualification,
address =  req.body.address,
gstnumber = req.body.gstnumber,
heighestqualification = req.body.heighestqualification,
mobile = req.body.mobile,
pannumber  = req.body.pannumber,
partnertype = req.body.partnertype,
skills = req.body.skills,
workexperience = req.body.workexperience,

UserData.findByIdAndUpdate({"_id":id},
  {$set:{"additionalqualification":additionalqualification,
    "address":address,
    "gstnumber":gstnumber,
    "heighestqualification":heighestqualification,
    "mobile":mobile,
    "pannumber":pannumber,
    "partnertype":partnertype,
    "skills":skills,
    "workexperience" : workexperience
}})
.then((success)=> {
  console.log('success', success);
  res.status(200).json({
    success: true,
    userType: req.body.userType,
    message: 'Profile Updated Successfully'
  });
})
.catch((err)=> {
  res.json({
    success: false,
    message: 'Profile Updated failed',
  });
});
});


module.exports = authRouter;