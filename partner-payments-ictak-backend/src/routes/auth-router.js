const express = require(`express`);
//const UserData = require(`../model/user-model`);
const User = require('../model/Userdata');

const authRouter = express.Router();

email="abcd@gmail.com";
password="Abcd@1234"

authRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
});

authRouter.post('/login', (req,res)=>{
  let userdata = req.body

  if(email !== userdata.email) {
      res.status(401).send('Invalid Email')
  } else if(password !== userdata.password) {
      res.status(401).send('Invalid Password')
  } else {
      res.status(200).send()
  }
});

authRouter.post('/adduser',function(req,res){/*verifyToken,/insert*/ 
   
  console.log(req.body);

  var user = {       
    name : req.body.fullname,
    email : req.body.email,
    password : req.body.password,
    usertype : req.body.usertype
 }     
   var user = new User(user);//create an instance of your model
  user.save() 
  .then((success)=> {
    res.status(200).json({
      success: true,
      message: 'User Addition Successfull'
    });
  })
  .catch((err)=> {
      res.json({
        success: false,
        message: 'User Addition Failure'
      });
  });
});
module.exports = authRouter;