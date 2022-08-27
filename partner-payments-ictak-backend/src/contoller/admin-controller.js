const puppeteer = require('puppeteer');

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

generatePdf = (requestId)=> {

  (async (requestId) => {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
      headless: true
    })  
  
    const page = await browser.newPage();
  
    page.setViewport({width: 1440, height: 2000})
  
    await page.goto('http://localhost:8080/api/admin/createworkorder');
  
    await page.pdf({
      format: 'A4',
      path: `${__dirname}/../assets/work-orders/workorder_${requestId}.pdf`,
      printBackground: true
    }).then((succ)=> {
      console.log(`PDF file saved at ${__dirname}/../assets/work-orders/workorder_${requestId}.pdf`);
    }).catch((err)=> {
      console.log(err);
    });
  
    await browser.close();
  
  })(requestId);

}

module.exports = { userListGen, generatePdf }