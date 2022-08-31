const express = require(`express`);
const InvoiceData  = require('../model/invoice-model')
const partnerRouter = express.Router();

const multipleUpload = require('../contoller/partner-controller')
const { TrainingRequest } = require(`../model/work-order-model`);


partnerRouter.post('/invoice', (req,res)=> {
  console.log('req', req.body);

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


partnerRouter.get(`/workorder`, (req, res)=> {

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