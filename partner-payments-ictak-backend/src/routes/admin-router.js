const express = require(`express`);
const TrainingRequest = require(`../model/training-request-model`);
const UserData = require(`../model/user-model`);
const { userListGen, generatePdf } = require('../contoller/admin-controller')

const adminRouter = express.Router();

adminRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
});

adminRouter.get(`/trainingrequests`, (req,res)=> {
  TrainingRequest.find()
    .then((succ)=> {
      res.send(succ)
    }).catch((err)=> {
      console.log(err);
      res.send('Some error')
    });
});

adminRouter.post('/newrequest', (req, res)=> {

  //Converting the start and end time to valid date objects for mongoose - combine date and time
  req.body.trainingRequest.sessionDetails.startTime = req.body.trainingRequest.sessionDetails.date + 'T' + req.body.trainingRequest.sessionDetails.startTime
  req.body.trainingRequest.sessionDetails.endTime = req.body.trainingRequest.sessionDetails.date + 'T' + req.body.trainingRequest.sessionDetails.endTime
  
  // split and save partner ID and name
  req.body.trainingRequest.trainingDetails.partnerId = req.body.trainingRequest.trainingDetails.partner.split(',')[0];
  req.body.trainingRequest.trainingDetails.partnerName = req.body.trainingRequest.trainingDetails.partner.split(',')[1];

  var request = req.body.trainingRequest;
  var newRequest = new TrainingRequest(request);

  newRequest.save({ timestamps: true })
    .then((succ)=> {
      console.log('New training request saved');
      res.status(200).json({
        success: true,
        message: 'New training request saved'
      });
    }).catch((err)=> {
      console.log("Failed to add new training request");
      res.status(500).json({
        success: false,
        message: 'Unknown Error! New request not saved'
      });
    });
});

adminRouter.get(`/getpartners`, (req, res)=> {
  UserData.find({
    $and: [
      { userType: 'Partner' },
      { adminapproved: true }
    ]
  })
    .then((succ)=> {
      let partnerList =  userListGen(succ) // calling the function to modify the fetched list of users
      res.status(200).send(partnerList);
    }).catch((err)=> {
      console.log(err);
    });
});

adminRouter.route(`/createworkorder`)
  .get((req, res)=> {
    res.render('template', {});
  })
  .post((req, res)=> {
    generatePdf(req.body.requestId)
      .then((returned)=> {
        if(returned) {
          res.json({
            success: returned,
            message: 'Work order generation successful'
          });
        } else {
          res.json({
            success: returned,
            message: 'Work order generation failed'
          });
        }
      },
      (err)=> {
        console.log('Error', err);
      });


  });

module.exports = adminRouter;
