const express = require(`express`);
const multer = require("multer");
const invoicedata  = require('../model/partner-model')
const path  = require("path")
const partnerRouter = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "src/assets/uploads/invoices");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  
  var multipleUpload = multer({storage:storage}).array('files')
  
  
  partnerRouter.post('/invoice', function(req,res){
      console.log('app.js: L16', req.body);
     
     var newInvoice = new invoicedata(req.body);
     newInvoice.save()
      .then((succ)=> {
          console.log('SUCCESS-->', succ);
          res.status(200).json({
            success: true,
            message: 'Invoice saved successfully'
          });
      }).catch((error)=> {
          console.log(error.message);
      });
  })
  
  partnerRouter.post('/multiplefiles', (req, res) => {
    multipleUpload(req, res, (err) => {
        if (err) {
            console.log(err)
        }
        console.log(req.files)
        console.log(req.body);
  
        let img = []
  
        req.files.forEach(file => {
            img.push(file.filename)
  
        });
  
        res.json({
            path:img
        })
        
    })
  })
  

module.exports = partnerRouter;