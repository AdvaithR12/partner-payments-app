const express = require(`express`);
const invoiceData  = require('../model/invoice-model')
const partnerRouter = express.Router();
const multipleUpload = require('../contoller/partner-controller');
const UserData = require(`../model/user-model`);
const { TrainingRequest } = require(`../model/work-order-model`);


partnerRouter.post('/invoice', function(req,res){

  var newInvoice = new invoiceData(req.body);
  newInvoice.save()
  .then((succ)=> {
    console.log('New invoice data added');
    res.status(200).json({
      success: true,
      message: 'Invoice saved successfully'
    });
  }).catch((err)=> {
      console.log('Invoice upload failed', error.message);
  });

});

partnerRouter.post('/multiplefiles', (req, res) => {

  multipleUpload(req, res, (err) => {
    if(err) {
      console.log(err.message)
    }

    let img = []
    req.files.forEach(file => {
      img.push(file.filename)
    });

    res.json({
      path:img
    })
  });

});

partnerRouter.get(`/getpartners`, (req, res)=> {
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


partnerRouter.get(`/getworkorders`, (req,res)=> {
  console.log(req.query);
  
  var userId = req.query.userId

  TrainingRequest.find({ 
    $and:[
      {"trainingDetails.partnerId" : userId },
      {adminApproved: true},
      { financeApproved: true }
    ]
  })
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

partnerRouter.get(`/getworkorder/:id`, (req, res)=> {
  console.log(req.params.id);
})

module.exports = partnerRouter;