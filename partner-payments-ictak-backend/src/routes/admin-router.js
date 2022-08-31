const express = require(`express`);
const UserData = require(`../model/user-model`);
const InvoiceData = require(`../model/invoice-model`);
const { TrainingRequest } = require(`../model/work-order-model`);
const { userListGen, createWorkOrder } = require('../contoller/admin-controller');

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
  // newRequest.sessionDetails.startTime = newRequest.sessionDetails.date + 'T' + newRequest.sessionDetails.startTime
  // newRequest.sessionDetails.endTime = newRequest.sessionDetails.date + 'T' + newRequest.sessionDetails.endTime
  
  

  // split and save partner ID and name
  newRequest.trainingDetails.partnerId = newRequest.trainingDetails.partner.split(',')[0];
  newRequest.trainingDetails.partnerName = newRequest.trainingDetails.partner.split(',')[1];
  newRequest.trainingDetails.partnerEmail = newRequest.trainingDetails.partner.split(',')[2];

  newRequest.adminApproved = false;
  newRequest.financeApproved = false;

  console.log(newRequest);
  var newRequestData = new TrainingRequest(newRequest);

  newRequestData.save({ timestamps: true })
    .then((succ)=> {
      console.log('New training request saved');
      res.status(200).json({
        success: true,
        message: 'New training request saved'
      });
    }).catch((err)=> {
      console.log("Failed to add new training request", err);
      res.status(500).json({
        success: false,
        message: 'Unknown Error! New request not saved'
      });
    });
});

adminRouter.put('/updaterequest', (req, res)=> {
  console.log(req.body);
});

adminRouter.get('/trainingrequest', (req, res)=> {
  TrainingRequest.findById(req.query.requestId, (err, data)=> {
    if(err) {
      console.log(err.message);
      res.status(500).json({
        success: false,
        message: err.message
      });
    } else {
      res.status(200).json({
        success: true,
        data: data
      });
    }
  });
});

adminRouter.get(`/trainingrequests`, (req,res)=> {
  TrainingRequest.find({ adminApproved: false })
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
    createWorkOrder(req, res)
      .then((succ)=> {
        if(succ.success) {
          console.log('New work order generated')
          res.status(200).json({
            success: true,
            message: 'New work order generation successfull'
          });
        } else {
          console.log('New work order generation failed, A-R: L83')
          res.status(500).json({
            success: false,
            message: 'New work order generation failed'
          });
        }
      }).catch((err)=> {
        console.log('New work order generation failed, A-R: L90', err.message);
        res.status(500).json({
          success: false,
          message: 'New work order generation failed'
        });
      });
  });

adminRouter.get(`/getworkorders`, (req,res)=> {

  TrainingRequest.find(req.query)
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
});

adminRouter.get(`/getinvoices`, (req, res)=> {
  
  InvoiceData.find(req.query)
    .then((succ)=> {
      res.status(200).json({
        success: true,
        data: succ
      })
    }).catch((err)=> {
      console.log('Error while fetching invoices');
      res.status(500).json({
        success: false,
        message: `Server error while fetching invoices`
      });
    });
});

module.exports = adminRouter;
