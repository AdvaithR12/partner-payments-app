const express = require(`express`);
const fs = require('fs');
const path = require('path');
const UserData = require(`../model/user-model`);
const InvoiceData = require(`../model/invoice-model`);
const RemittanceData = require(`../model/finance-model`);
const financeRouter = express.Router();

financeRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
});

  

financeRouter.get(`/getinvoices`, (req, res)=> {

    console.log(req.query);

    //var adminApproved = req.query.adminApproved;
    //var invoiceType = req.query.invoiceType;

    InvoiceData.find({ 
        $and:[
          { adminApproved: true },
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

  financeRouter.get('/getinvoice/:id', (req, res)=> {

    if(fs.existsSync((path.join(__dirname, '../assets/uploads/invoices', `${req.params.id}`)))) { //check if the requested file exists in the file system.
      res.status(200).sendFile(path.join(__dirname, '../assets/uploads/invoices', `${req.params.id}`)); //send the file if it exists
    } else {
      res.status(404).send('File not found'); // send 400 if it doesnt
    }
  
  });

 financeRouter.put('/remittance', (req,res)=> {
  
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

  });

  

module.exports = financeRouter;