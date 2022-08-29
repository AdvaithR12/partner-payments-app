const express = require(`express`);
const TrainingRequest = require(`../model/work-order-model`);
const UserData = require(`../model/user-model`);
const { userListGen, generatePdf, storeWorkOrderData } = require('../contoller/admin-controller')

const adminRouter = express.Router();

adminRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
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

adminRouter.post('/newrequest', (req, res)=> {

  var newRequest = req.body.trainingRequest;

  //Converting the start and end time to valid date objects for mongoose - combine date and time
  newRequest.sessionDetails.startTime = newRequest.sessionDetails.date + 'T' + newRequest.sessionDetails.startTime
  newRequest.sessionDetails.endTime = newRequest.sessionDetails.date + 'T' + newRequest.sessionDetails.endTime
  
  // split and save partner ID and name
  newRequest.trainingDetails.partnerId = newRequest.trainingDetails.partner.split(',')[0];
  newRequest.trainingDetails.partnerName = newRequest.trainingDetails.partner.split(',')[1];

  newRequest.approved = false;
  var newRequestData = new TrainingRequest(newRequest);

  newRequestData.save({ timestamps: true })
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

adminRouter.get(`/trainingrequests`, (req,res)=> {
  TrainingRequest.find({approved: false})
    .then((succ)=> {
      res.send(succ)
    }).catch((err)=> {
      console.log(err);
      res.send('Some error')
    });
});

adminRouter.route(`/createworkorder`)
  .get((req, res)=> {
    res.render('template', {});
  })
  .post((req, res)=> {
    generatePdf(req.body.requestId) // call function to generate pdf and name it using the requestId
      .then((result)=> {
        if(result.success) {
          console.log('New work order generated');
          storeWorkOrderData(result.fileName, req.body.requestId);
          res.json({
            success: result.success,
            fileName: result.fileName,
            message: 'Work order generation successful'
          });
        } else {
          res.json({
            success: result.success,
            message: 'Work order generation failed'
          });
        }
      },
      (err)=> {
        console.log('Unknown error', err.message);
      });


  });

adminRouter.get(`/getworkorders`, (req,res)=> {
  TrainingRequest.find({approved: true})
    .then((succ)=> {
      res.status(200).json({
        success: true,
        workOrders: succ
      });
    }).catch((err)=> {
      console.log('Error on fetching work orders', err.message);
      res.status(500).json({
        success: false,
        message: `Unknown error. Can't get list of work orders`
      });
    });
});

adminRouter.get(`/getworkorder/:id`, (req, res)=> {
  console.log(req.params.id);
})

module.exports = adminRouter;
