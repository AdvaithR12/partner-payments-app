const express = require(`express`);
const UserData = require(`../model/user-model`);
const fs = require('fs');
const path = require('path');
const InvoiceData = require(`../model/invoice-model`);
const UserData = require(`../model/user-model`);
const { TrainingRequest } = require(`../model/work-order-model`);
const { userListGen, createWorkOrder, approveInvoice } = require('../contoller/admin-controller');

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

//adminRouter.get(`/getworkorder/:id`, (req, res)=> {
 // console.log(req.params.id);
//});

adminRouter.get(`/getuserlist`, (req, res)=> {

  UserData.find({adminapproved: false})
  .then((succ)=> {
    let userList = userListGen(succ); 
    console.log(userList);
    res.status(200).json({
      success: true,
      data: userList
    });
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
  newRequest.trainingDetails.partnerEmail = newRequest.trainingDetails.partner.split(',')[2];

  newRequest.adminApproved = false;
  newRequest.financeApproved = false;

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
    res.render('template', req.query);
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
          console.log('New work order generation failed, A-R: L109')
          res.status(500).json({
            success: false,
            message: 'New work order generation failed'
          });
        }
      }).catch((err)=> {
        console.log('New work order generation failed, A-R: L116', err.message);
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

  if(fs.existsSync(path.join(__dirname, '../assets/work-orders/generated/', `workorder_${req.params.id}.pdf`))) {
    res.status(200).sendFile(path.join(__dirname, '../assets/work-orders/generated/', `workorder_${req.params.id}.pdf`));
  } else {
    console.log('File not found');
    res.status(404).send('File not found');
  }

});

adminRouter.get('/getinvoice/:id', (req, res)=> {

  if(fs.existsSync((path.join(__dirname, '../assets/uploads/invoices', `${req.params.id}`)))) { //check if the requested file exists in the file system.
    res.status(200).sendFile(path.join(__dirname, '../assets/uploads/invoices', `${req.params.id}`)); //send the file if it exists
  } else {
    res.status(404).send('File not found'); // send 400 if it doesnt
  }

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

adminRouter.put('/approveinvoice', (req, res)=> {

  InvoiceData.findById(req.body.invoiceId)
    .then((data)=> {
      // console.log(data);
      approveInvoice(res, data);
    }).catch((err)=> {
      console.log('Error while fetching invoice data', err.message);
    });

});

module.exports = adminRouter;
