const express = require(`express`);
// const UserData = require(`../model/user-model`);

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

module.exports = authRouter;