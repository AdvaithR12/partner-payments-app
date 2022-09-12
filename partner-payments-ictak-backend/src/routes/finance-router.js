const express = require(`express`);
const fs = require('fs');
const path = require('path');
const UserData = require(`../model/user-model`);
const InvoiceData = require(`../model/invoice-model`);
const { TrainingRequest } = require(`../model/work-order-model`);
const RemittanceData = require(`../model/finance-model`);
const { isDate } = require('util/types');
const { verifyToken } = require('../contoller/auth-controller');
const financeRouter = express.Router();

financeRouter.get('/getinvoice/:id',verifyToken, (req, res)=> {

    if(fs.existsSync((path.join(__dirname, '../assets/uploads/invoices', `${req.params.id}`)))) { //check if the requested file exists in the file system.
      res.status(200).sendFile(path.join(__dirname, '../assets/uploads/invoices', `${req.params.id}`)); //send the file if it exists
    } else {
      res.status(404).send('File not found'); // send 400 if it doesnt
    }
  
});

financeRouter.get(`/getinvoices`, verifyToken, (req, res)=> {

    InvoiceData.find({ 
        $and:[
          { adminApproved: true },
          { paid: false},
          { invoiceType: req.query.invoiceType }
        ]
      })
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

financeRouter.get(`/getworkorders`,verifyToken, (req,res)=> {

  TrainingRequest.find({ 
    $and:[
      { adminApproved: true },
      { financeApproved: req.query.approvalStatus }
    ]
  })
    .then((succ)=> {
      console.log(succ)
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

financeRouter.put('/setworkorder',verifyToken, (req,res) =>{ 
  const id = req.body.id;
  const isapproved = req.body.financeApproved;
  TrainingRequest.findByIdAndUpdate({"_id":id},
  {$set:{
    "financeApproved":isapproved
  }}).then((success)=> {
    res.status(200).json({
      success: true,
      message: 'Work order updated successfully'
    });
  }).catch((err)=> {
    res.json({
      success: false,
      message: 'Work order updated failed',
    });
  });
});

financeRouter.post('/remittance',verifyToken, (req,res)=> {
  
  var newRemittance = new RemittanceData(req.body.data);
  newRemittance.save()
    .then((succ)=> {
      console.log('Payment Details added');
      res.status(200).json({
        success: true,
        message: 'saved successfully'
      });
    }).catch((err)=> {
      console.log('failed', err.message);
    });

    var invoiceId = req.body.invoiceId;

    var current_date=new Date();

    InvoiceData.findByIdAndUpdate({"_id": invoiceId},
    {$set:{
      "paid": true,
      "paymentDate": current_date
    }})
    .then((success)=> {
      console.log('success', success);
      res.status(200).json({
        success: true,
        message: 'payment updated successfully'
      });
      
    }).catch((err)=> {
      res.json({
        success: false,
        message: 'payment update failed',
      });
    });

    
});

module.exports = financeRouter;