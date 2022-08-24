const express = require(`express`);
const TrainingRequest = require('../model/admin/training-request-model')

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
})

adminRouter.post('/newrequest', (req, res)=> {

  //Converting the start and end time to valid date objects for mongoose
  req.body.trainingRequest.sessionDetails.startTime = req.body.trainingRequest.sessionDetails.date + 'T' + req.body.trainingRequest.sessionDetails.startTime
  req.body.trainingRequest.sessionDetails.endTime = req.body.trainingRequest.sessionDetails.date + 'T' + req.body.trainingRequest.sessionDetails.endTime
  console.log(req.body);
  

  var request = req.body.trainingRequest;
  var newRequest = new TrainingRequest(request);

  newRequest.save()
    .then((succ)=> {
      console.log('New training request saved');
    }).catch((err)=> {
      console.log("Failed to add new training request");
    });
});

module.exports = adminRouter;
