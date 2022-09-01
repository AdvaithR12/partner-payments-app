const puppeteer = require('puppeteer');
const fs = require('fs');
const InvoiceData = require('../model/invoice-model');
const { TrainingRequest, WorkOrderCounter } = require(`../model/work-order-model`);

userListGen = (users)=> { // function to return the list of received users omitting some fields
  var userList = [];

  users.forEach((user)=> {
    let userInfo = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      userType: user.userType,
      adminapproved: user.adminapproved
    }
    userList.push(userInfo);
  });

  return userList;

}

generateWorkOrderNumber = async ()=> {
  let date = new Date();
  let workOrderNumber;
  await WorkOrderCounter.findOneAndUpdate({ //to generate a serial number for work orders
    $and: [
      {year: date.getFullYear()}, //collection with the current month and year is fetched
      {month: date.getMonth()}
    ]}, {
      $inc: {
        count: 1  //increment the count if the collection with current month and year is found
      }
    }, { upsert: true, new: true } ) //insert new collection with current month and year if not found; return the new/updated document always
    .then((succ)=> {
      let countStr = succ.count.toString()
      while (countStr.length < 4) countStr = "0" + countStr;
      workOrderNumber = `WOD/${date.getMonth()+1}/${date.getFullYear()}/${countStr}`
    }).catch((err)=> {
      console.log('Error while generating work order number, A-C: L39', err);
    });
    return workOrderNumber
}

generatePdf = async (requestId, workOrderNumber) => {
    let result = { 
      success: false,
      fileName:  false
    }

    // launch a new chrome instance
    const browser = await puppeteer.launch({
      headless: true
    })  
  
    const page = await browser.newPage();
  
    page.setViewport({width: 1440, height: 2000})
  
    //await to connect to the page with the mentioned address - (if successful- try & generate the pdf present in the page mentioned url, if failed- show error), if connection failed, show error;;; Return generated = true only on successfull pdf generation. Return generated = false for all other cases.
    await page.goto('http://localhost:8080/api/admin/createworkorder')
      .then( async ()=> {
        await page.pdf({ // page to pdf if connection is successfull
          format: 'A4',
          path: `${__dirname}/../assets/work-orders/generated/workorder_${requestId}.pdf`,
          printBackground: true
        }).then(()=> {
            result.success = true; //on successful connection and pdf generation
            result.fileName = `workorder_${requestId}.pdf`;
          },
          (err)=> {
            console.log('Error while generating pdf, A-C: L71', err.message); //on pdf generation failure
          });
      }).catch((err)=> {
        console.log('Error on connection, A-C: L74', err.message); //on connection failure
      });
    
    await browser.close();
    return result;

}

storeWorkOrderData = async (fileName, requestId, workOrderNumber)=> {
  let date = new Date();

  return await TrainingRequest.findByIdAndUpdate({_id: requestId}, {
    $set: {
      adminApproved: true,
      workOrderDetails: {
        workOrderNumber: workOrderNumber,
        fileName: fileName,
        generatedDate: ` ${date.getFullYear().toString()}-${(date.getMonth()+1).toString()}-${date.getDate().toString()}`
        // generatedDate: ` ${date.getFullYear().toString()}-${(date.getMonth().toString().length == 2) ? date.getMonth().toString() : ('0'+date.getMonth().toString()) }-${date.getDate().toString()}`
      }
    }
  }, { new: true });
}

createWorkOrder = async (req, res)=> {

  // call function to generate a Work Order Number.
  let workOrderNumber = await generateWorkOrderNumber(); 

  // call function to generate pdf and name it using the requestId
  let pdfGenerationStatus = await generatePdf(req.body.requestId, workOrderNumber) 

  // await to store the generated work order data in db
  let storeWorkOrderStatus = await storeWorkOrderData(pdfGenerationStatus.fileName, req.body.requestId, workOrderNumber);

  if(storeWorkOrderStatus.adminApproved && pdfGenerationStatus.success) {
    return { 
      success: true, 
      workOrderNumber: workOrderNumber 
    }
  } else {
    return { success: false }
  }

}

approveInvoice = async (res, data)=> {

    InvoiceData.findByIdAndUpdate(data._id, {
    $set : {
      adminApproved: true,
      invoiceDueDate: 2022-12-12
    }
  }, { new: true }, (err, data)=> {
    if(err) {
      console.log('Error while updating Invoice data', err.message)
    } else {
      fs.rename(`./src/assets/uploads/invoices/${data.fileName}`, `./src/assets/uploads/invoices/invoice_${data._id}.${data.fileName.split('.')[1]}`, (err)=> { //rename the invoice file name on approval and set the extension by extracting it from the uploaded filename
        if(err) {
          console.log('Error while renaming',  err.message);
        } else {
          res.status(200).json({
            success: true
          });
        }
      });
    }
  });
}

module.exports = { userListGen, createWorkOrder, approveInvoice };