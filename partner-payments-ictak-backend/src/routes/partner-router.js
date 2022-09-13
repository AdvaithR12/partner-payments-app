const express = require(`express`);
const InvoiceData  = require('../model/invoice-model')
const partnerRouter = express.Router();
const fs = require('fs');
const path = require('path');
const multipleUpload = require('../contoller/partner-controller');
const { TrainingRequest } = require(`../model/work-order-model`);
const { verifyToken } = require('../contoller/auth-controller');


partnerRouter.post('/invoice',verifyToken, (req,res)=> {

  var newInvoice = new InvoiceData(req.body);
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

partnerRouter.post('/multiplefiles',verifyToken, (req, res) => {
  console.log('multiplefiles endpoint');
  multipleUpload(req, res, (err) => {
    console.log('multipleupload fn');
    if(err) {
      console.log('Error on calling multiple upload', err.message)
    }

    let img = []
    req.files.forEach(file => {
      img.push(file.filename)
    });

    res.json({
      success: true,
      path:img
    })
  });

});

partnerRouter.get(`/getworkorders`,verifyToken, (req,res)=> {
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

partnerRouter.get(`/workorder`,verifyToken, (req, res)=> {

  TrainingRequest.find({ "workOrderDetails.workOrderNumber" : req.query.workOrderNumber.trim()})
    .then((succ)=> {
      res.status(200).json({
        success: true,
        data: succ[0]
      });
    }).catch((err)=> {
      res.status(500).json({
        success: false,
        message: 'Error while fetching work order'
      });
    });

});

module.exports = partnerRouter;