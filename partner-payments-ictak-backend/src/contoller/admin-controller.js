const puppeteer = require('puppeteer');
const TrainingRequest = require(`../model/work-order-model`);


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

generatePdf = async (requestId) => {
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
            console.log('Error while generating pdf: generatePdf.L51', err.message); //on pdf generation failure
          });
      }).catch((err)=> {
        console.log('Error on connection: generatePdf.L54', err.message); //on connection failure
      });
    
    await browser.close();
    return result;

};

storeWorkOrderData = (fileName, requestId)=> {
  let date = new Date();
  console.log();

  TrainingRequest.findByIdAndUpdate({_id: requestId}, {
    $set: {
      approved: true,
      workOrderDetails: {
        workOrderId: `WOD-${date.getFullYear()}`,
        fileName: fileName,
        generatedDate: ` ${date.getFullYear().toString()}-${(date.getMonth().toString().length == 2) ? date.getMonth().toString() : ('0'+date.getMonth().toString()) }-${date.getDate().toString()}`
      }
    }
  }, { new: true })
    .then((succ)=> {
      console.log(succ);
    }).catch((err)=> {
      console.log(err);
    });
}

module.exports = { userListGen, generatePdf, storeWorkOrderData }