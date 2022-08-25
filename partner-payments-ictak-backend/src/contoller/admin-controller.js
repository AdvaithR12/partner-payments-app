const PDFDocument = require('pdfkit');
const fs = require('fs');

pdfGeneration = (requestData)=> {
  console.log('pdfgen fn', requestData.trainingDetails.partner);

  let pdfDoc = new PDFDocument;
  pdfDoc.pipe(fs.createWriteStream(`./src/assets/work-orders/${requestData._id}.pdf`))
    .on('err', (err)=> {
      console.log(err);
    });

    pdfDoc.text("My Sample PDF Document");
    pdfDoc.end();
  // pdfDoc.pipe(fs.createWriteStream(`../assets/work-orders/${requestData.trainingDetails.partner}.pdf`));
    // .on('err', (err)=> {
    //   console.log(err);
    // });

  // .then((succ)=> {
    //   console.log('succ', succ);
    // }).catch((err)=> {
    //   console.log('err', err);
    // });

}

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

module.exports = { pdfGeneration, userListGen }