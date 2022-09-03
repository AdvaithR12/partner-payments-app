const express = require(`express`);
const fs = require('fs');
const path = require('path');
const InvoiceData = require(`../model/invoice-model`);
const { TrainingRequest } = require(`../model/work-order-model`);

const financeRouter = express.Router();

financeRouter.get(`/`, (req, res)=> {
  res.send(`Hi I'm listening at /auth`);
});

financeRouter.get('/getinvoice/:id', (req, res)=> {

    if(fs.existsSync((path.join(__dirname, '../assets/uploads/invoices', `${req.params.id}`)))) { //check if the requested file exists in the file system.
      res.status(200).sendFile(path.join(__dirname, '../assets/uploads/invoices', `${req.params.id}`)); //send the file if it exists
    } else {
      res.status(404).send('File not found'); // send 400 if it doesnt
    }
  
});

financeRouter.get(`/getinvoices`, (req, res)=> {

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

financeRouter.put('/setworkorder', (req,res) =>{  /*verifyToken,/insert*/ 
  // console.log('Backend',req.body);
  const id = req.body.id;
  const isapproved = req.body.financeApproved;
  console.log(id, isapproved);
  TrainingRequest.findByIdAndUpdate({"_id":id},
  {$set:{
    "financeApproved":isapproved
}})
.then((success)=> {
  console.log('success', success);
  res.status(200).json({
    success: true,
    message: 'Work order updated successfully'
  });
})
.catch((err)=> {
  res.json({
    success: false,
    message: 'Work order updated failed',
  });
});

});

module.exports = financeRouter;