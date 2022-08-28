const express = require(`express`);
const invoiceData  = require('../model/invoice-model')
const partnerRouter = express.Router();
const multipleUpload = require('../contoller/partner-controller')


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

module.exports = partnerRouter;